import { Identity } from 'openfin/_v2/main';
import { _Window } from 'openfin/_v2/api/window/window';
import { Rect } from 'openfin/_v2/api/system/monitor';

// used to represent pointer position
export interface Position {
    top: number;
    left: number;
}

// simple rectangle interfact
export interface R {
    left: number;
    top: number;
    width: number;
    height: number;
}

// simple monitor interface - with both full and available rectangles
interface MonitorInfo {
    fullRect: Rectangle;
    availableRect: Rectangle;
}

// rectangle implementation - collidesWith(rect) and contains(xy)
export class Rectangle implements R {
    name: string;
    left: number;
    top: number;
    width: number;
    height: number;

    constructor(name:string, left:number, top:number, width:number, height:number) {
        this.name = name;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    collidesWith(rect:R):boolean {
        const { left, top, width, height } = rect;
        if (this.left <= left + width && this.left + this.width >= left &&
            this.top <= top + height && this.top + this.height >= top) {
            return true;
        }
        return false;
    }
    contains(xy:Position):boolean {
        return ((this.left <= xy.left) && (xy.left <= (this.left + this.width)) 
            && (this.top <= xy.top) && (xy.top <= (this.top + this.height)));
    }
}

/**
 *  Tiler: Window tiling helper
 *     - can "fit" windows into an area of a screen based on percentages
 *     - can center windows in an area of a screen, optionally passing new percentage based height/width
 */
export class Tiler {

    /**
     * given a window, fit it into the rectangle
     * @param win OpenFin window
     * @param area area to fit window into
     * @param left left edge location as a perctage of area
     * @param top top edge location as a perctage of area
     * @param width width of window as a percentage of area
     * @param height height of window as a percentage of area
     */
    static async fit(win:_Window, area:Rectangle, left:number, top:number, width:number, height:number):Promise<void> {
        const newDims = Tiler.calcDestRect(area, left, top, width, height);
        // WARNING: remove name property from Rectangle/Bounds object.
        //    The V2 API does an Object.assign(Identity, Bounds) so Bounds.name will override Identity.name
        delete newDims.name;
        try {
            await win.setBounds(newDims);
        } catch(e) {
            console.error(`Error fitting window ${win.identity.uuid}/${win.identity.name} to size: ${JSON.stringify(newDims)}`, e);
        }
    }

    /**
     * given a window identity, wrap it and then fit it
     * @param winID identity of OpenFin window (uuid/name)
     * @param area area to fit window into
     * @param left left edge location as a perctage of area
     * @param top top edge location as a perctage of area
     * @param width width of window as a percentage of area
     * @param height height of window as a percentage of area
     */
    static async wrapAndFit(winID:Identity, area:Rectangle, left:number, top:number, width:number, height:number):Promise<_Window|null> {
        try {
            const w = fin.Window.wrapSync(winID);
            await Tiler.fit(w, area, left, top, width, height);
            return w;
        } catch(e) {
            console.error(`Error fitting window ${winID.uuid}/${winID.name}`, e);
        }
        return null;
    }

    /**
     * given a window, center it on the current monitor, optional percentage based height/width
     * @param win OpenFin window
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async center(win:_Window, newwidth?:number, newheight?:number):Promise<void> {
        const rect = await Tiler.getMonitorForWindow(win);
        return Tiler.centerWithin(win, rect!, newwidth, newheight);
    }

    /**
     * given a window, wrap and center it within an area
     * @param win OpenFin window
     * @param area area to center window within
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async centerWithin(win:_Window, area:Rectangle, newwidth?:number, newheight?:number):Promise<void> {
        let top = 0;
        let left = 0;
        let width = 0;
        let height = 0;
        const b = await win.getBounds();
        if (newwidth) {
            left = (100 - newwidth) / 2;
            width = newwidth;
        } else {
            width = (b.width/area.width) * 100;
            left = (100-width) / 2;
        }
        if (newheight) {
            top = (100 - newheight) / 2;
            height = newheight;
        } else {
            height = (b.height/area.height) * 100;
            top = (100-height) / 2;
        }
        return Tiler.fit(win, area, left, top, width, height);
    }

    /**
     * given a window identity, wrap it and then center it
     * @param winID identity of OpenFin window (uuid/name)
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async wrapAndCenter(winID:Identity, newwidth?:number, newheight?:number):Promise<_Window> {
        const w = fin.Window.wrapSync(winID);
        Tiler.center(w, newwidth, newheight);
        return w;
    }

    /**
     * given a window identity, wrap it and then center it with the area
     * @param winID identity of OpenFin window (uuid/name)
     * @param area area to center window within
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async wrapAndCenterWithin(winID:Identity, area:Rectangle, newwidth?:number, newheight?:number):Promise<_Window> {
        const w = fin.Window.wrapSync(winID);
        Tiler.centerWithin(w, area, newwidth, newheight);
        return w;
    }

    /**
     * return monitor info for a point (typically the cursor position)
     * @param p the position/point to reference
     */
    static async getMonitorForPosition(p:Position):Promise<Rectangle|null> {
        const monitors = await Tiler.collectMonitors();
        for (let i=0; i<monitors.length; i++) {
            const rect = monitors[i].fullRect;
            if (rect.contains(p)) {
                return monitors[i].availableRect;
            }
        }
        return monitors[0].availableRect;
    }

    /**
     * return monitor info for a window (based on top/left of monitor)
     *   TODO: investigate using area overlap of monitor/window (probably OS specific)
     * @param w the window to reference
     */
    static async getMonitorForWindow(w:_Window):Promise<Rectangle|null> {
        const bounds = await w.getBounds();
        return Tiler.getMonitorForPosition(bounds);
    }

    // given an area, translate left, top, width and height from percentages to pixels
    private static calcDestRect(area:Rectangle, left:number, top:number, width:number, height:number):Rectangle {
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        if (top < 0) left = 0;
        if (top > 100) left = 100;
        if (width < 0) left = 0;
        if (width > 100) left = 100;
        if (height < 0) left = 0;
        if (height > 100) left = 100;
        return new Rectangle('dest', area.left+(area.width*(left/100)), area.top+(area.height*(top/100)), area.width*(width/100), area.height*(height/100));
    }

    // get monitor info - returns available and full rectangles
    private static async collectMonitors():Promise<MonitorInfo[]> {
        const monInfo = await fin.System.getMonitorInfo();
        const monitors:MonitorInfo[] = [];
        let mon:MonitorInfo = {
            fullRect: Tiler.makeMonitorRect(monInfo.primaryMonitor.name, monInfo.primaryMonitor.monitorRect),
            availableRect: Tiler.makeMonitorRect(monInfo.primaryMonitor.name, monInfo.primaryMonitor.availableRect)
        };
        monitors.push(mon);
        for (let i=0; i<monInfo.nonPrimaryMonitors.length; i++) {
            const nonPInfo = monInfo.nonPrimaryMonitors[i];
            mon = {
                fullRect: Tiler.makeMonitorRect(nonPInfo.name, nonPInfo.monitorRect),
                availableRect: Tiler.makeMonitorRect(nonPInfo.name, nonPInfo.availableRect)
            };
            monitors.push(mon);
        }
        return monitors;
    }

    // construct a Rectange from a monitor's Rect
    private static makeMonitorRect(name:string, mon:Rect):Rectangle {
        return new Rectangle(name, mon.left, mon.top, mon.right-mon.left, mon.bottom-mon.top);
    }
}