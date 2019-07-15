/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/test.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tiler */ "./src/tiler.ts");

document.addEventListener("DOMContentLoaded", () => {
    let winCount = 0;
    const defaultWinCount = 2;
    const createWindow = () => {
        const winConfig = {
            name: `tiler-test-window-${winCount}`,
            url: `test.html`,
            defaultHeight: 400,
            defaultWidth: 400,
            defaultTop: 100 + (winCount + 1) * 30,
            defaultLeft: 100 + (winCount + 1) * 30,
            saveWindowState: false,
            autoShow: true
        };
        try {
            fin.Window.create(winConfig);
            winCount++;
        }
        catch (e) {
        }
    };
    document.getElementById('createAnotherWindow').addEventListener('click', () => {
        createWindow();
    });
    document.getElementById('centerme').addEventListener('click', () => {
        const me = fin.Window.getCurrentSync();
        _tiler__WEBPACK_IMPORTED_MODULE_0__["Tiler"].center(me);
    });
    document.getElementById('centerme5050').addEventListener('click', () => {
        const me = fin.Window.getCurrentSync();
        _tiler__WEBPACK_IMPORTED_MODULE_0__["Tiler"].center(me, 50, 50);
    });
    document.getElementById('centermehalf').addEventListener('click', async () => {
        const me = fin.Window.getCurrentSync();
        const rect = await _tiler__WEBPACK_IMPORTED_MODULE_0__["Tiler"].getMonitorForWindow(me);
        rect.width = rect.width / 2;
        _tiler__WEBPACK_IMPORTED_MODULE_0__["Tiler"].centerWithin(me, rect);
    });
    for (let i = 0; i < defaultWinCount; i++) {
        createWindow();
    }
});


/***/ }),

/***/ "./src/tiler.ts":
/*!**********************!*\
  !*** ./src/tiler.ts ***!
  \**********************/
/*! exports provided: Rectangle, Tiler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tiler", function() { return Tiler; });
// rectangle implementation - collidesWith(rect) and contains(xy)
class Rectangle {
    constructor(name, left, top, width, height) {
        this.name = name;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    collidesWith(rect) {
        const { left, top, width, height } = rect;
        if (this.left <= left + width && this.left + this.width >= left &&
            this.top <= top + height && this.top + this.height >= top) {
            return true;
        }
        return false;
    }
    contains(xy) {
        return ((this.left <= xy.left) && (xy.left <= (this.left + this.width))
            && (this.top <= xy.top) && (xy.top <= (this.top + this.height)));
    }
}
/**
 *  Tiler: Window tiling helper
 *     - can "fit" windows into an area of a screen based on percentages
 *     - can center windows in an area of a screen, optionally passing new percentage based height/width
 */
class Tiler {
    /**
     * given a window, fit it into the rectangle
     * @param win OpenFin window
     * @param area area to fit window into
     * @param left left edge location as a perctage of area
     * @param top top edge location as a perctage of area
     * @param width width of window as a percentage of area
     * @param height height of window as a percentage of area
     */
    static async fit(win, area, left, top, width, height) {
        const newDims = Tiler.calcDestRect(area, left, top, width, height);
        // WARNING: remove name property from Rectangle/Bounds object.
        //    The V2 API does an Object.assign(Identity, Bounds) so Bounds.name will override Identity.name
        delete newDims.name;
        try {
            await win.setBounds(newDims);
        }
        catch (e) {
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
    static async wrapAndFit(winID, area, left, top, width, height) {
        try {
            const w = fin.Window.wrapSync(winID);
            await Tiler.fit(w, area, left, top, width, height);
            return w;
        }
        catch (e) {
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
    static async center(win, newwidth, newheight) {
        const rect = await Tiler.getMonitorForWindow(win);
        return Tiler.centerWithin(win, rect, newwidth, newheight);
    }
    /**
     * given a window, wrap and center it within an area
     * @param win OpenFin window
     * @param area area to center window within
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async centerWithin(win, area, newwidth, newheight) {
        let top = 0;
        let left = 0;
        let width = 0;
        let height = 0;
        const b = await win.getBounds();
        if (newwidth) {
            left = (100 - newwidth) / 2;
            width = newwidth;
        }
        else {
            width = (b.width / area.width) * 100;
            left = (100 - width) / 2;
        }
        if (newheight) {
            top = (100 - newheight) / 2;
            height = newheight;
        }
        else {
            height = (b.height / area.height) * 100;
            top = (100 - height) / 2;
        }
        return Tiler.fit(win, area, left, top, width, height);
    }
    /**
     * given a window identity, wrap it and then center it
     * @param winID identity of OpenFin window (uuid/name)
     * @param newwidth new width of window as a percentage of area (optional)
     * @param newheight new height of window as a percentage of area (optional)
     */
    static async wrapAndCenter(winID, newwidth, newheight) {
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
    static async wrapAndCenterWithin(winID, area, newwidth, newheight) {
        const w = fin.Window.wrapSync(winID);
        Tiler.centerWithin(w, area, newwidth, newheight);
        return w;
    }
    /**
     * return monitor info for a point (typically the cursor position)
     * @param p the position/point to reference
     */
    static async getMonitorForPosition(p) {
        const monitors = await Tiler.collectMonitors();
        for (let i = 0; i < monitors.length; i++) {
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
    static async getMonitorForWindow(w) {
        const bounds = await w.getBounds();
        return Tiler.getMonitorForPosition(bounds);
    }
    // given an area, translate left, top, width and height from percentages to pixels
    static calcDestRect(area, left, top, width, height) {
        if (left < 0)
            left = 0;
        if (left > 100)
            left = 100;
        if (top < 0)
            left = 0;
        if (top > 100)
            left = 100;
        if (width < 0)
            left = 0;
        if (width > 100)
            left = 100;
        if (height < 0)
            left = 0;
        if (height > 100)
            left = 100;
        return new Rectangle('dest', area.left + (area.width * (left / 100)), area.top + (area.height * (top / 100)), area.width * (width / 100), area.height * (height / 100));
    }
    // get monitor info - returns available and full rectangles
    static async collectMonitors() {
        const monInfo = await fin.System.getMonitorInfo();
        const monitors = [];
        let mon = {
            fullRect: Tiler.makeMonitorRect(monInfo.primaryMonitor.name, monInfo.primaryMonitor.monitorRect),
            availableRect: Tiler.makeMonitorRect(monInfo.primaryMonitor.name, monInfo.primaryMonitor.availableRect)
        };
        monitors.push(mon);
        for (let i = 0; i < monInfo.nonPrimaryMonitors.length; i++) {
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
    static makeMonitorRect(name, mon) {
        return new Rectangle(name, mon.left, mon.top, mon.right - mon.left, mon.bottom - mon.top);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUE4QjtBQUU5QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRS9DLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNqQixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFFMUIsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1FBQ3RCLE1BQU0sU0FBUyxHQUFHO1lBQ2QsSUFBSSxFQUFHLHFCQUFxQixRQUFRLEVBQUU7WUFDdEMsR0FBRyxFQUFFLFdBQVc7WUFDaEIsYUFBYSxFQUFFLEdBQUc7WUFDbEIsWUFBWSxFQUFFLEdBQUc7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bGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdGVzdC50c1wiKTtcbiIsImltcG9ydCB7IF9XaW5kb3cgfSBmcm9tICdvcGVuZmluL192Mi9hcGkvd2luZG93L3dpbmRvdyc7XG5pbXBvcnQge1RpbGVyfSBmcm9tICcuL3RpbGVyJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG4gICAgbGV0IHdpbkNvdW50ID0gMDtcbiAgICBjb25zdCBkZWZhdWx0V2luQ291bnQgPSAyO1xuXG4gICAgY29uc3QgY3JlYXRlV2luZG93ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB3aW5Db25maWcgPSB7XG4gICAgICAgICAgICBuYW1lIDogYHRpbGVyLXRlc3Qtd2luZG93LSR7d2luQ291bnR9YCxcbiAgICAgICAgICAgIHVybDogYHRlc3QuaHRtbGAsXG4gICAgICAgICAgICBkZWZhdWx0SGVpZ2h0OiA0MDAsXG4gICAgICAgICAgICBkZWZhdWx0V2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGRlZmF1bHRUb3A6IDEwMCArICh3aW5Db3VudCsxKSozMCxcbiAgICAgICAgICAgIGRlZmF1bHRMZWZ0OiAxMDAgKyAod2luQ291bnQrMSkqMzAsXG4gICAgICAgICAgICBzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b1Nob3c6IHRydWVcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpbi5XaW5kb3cuY3JlYXRlKHdpbkNvbmZpZyk7XG4gICAgICAgICAgICB3aW5Db3VudCsrO1xuICAgICAgICB9IGNhdGNoKGUpIHtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGVBbm90aGVyV2luZG93JykhLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjcmVhdGVXaW5kb3coKTtcbiAgICB9KTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VudGVybWUnKSEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuICAgICAgICBUaWxlci5jZW50ZXIobWUpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbnRlcm1lNTA1MCcpIS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbWUgPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG4gICAgICAgIFRpbGVyLmNlbnRlcihtZSwgNTAsIDUwKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZW50ZXJtZWhhbGYnKSEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuICAgICAgICBjb25zdCByZWN0ID0gYXdhaXQgVGlsZXIuZ2V0TW9uaXRvckZvcldpbmRvdyhtZSk7XG4gICAgICAgIHJlY3QhLndpZHRoID0gcmVjdCEud2lkdGgvMjtcbiAgICAgICAgVGlsZXIuY2VudGVyV2l0aGluKG1lLCByZWN0ISk7XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRXaW5Db3VudDsgaSsrKSB7XG4gICAgICAgIGNyZWF0ZVdpbmRvdygpO1xuICAgIH1cblxufSk7XG4iLCJpbXBvcnQgeyBJZGVudGl0eSB9IGZyb20gJ29wZW5maW4vX3YyL21haW4nO1xuaW1wb3J0IHsgX1dpbmRvdyB9IGZyb20gJ29wZW5maW4vX3YyL2FwaS93aW5kb3cvd2luZG93JztcbmltcG9ydCB7IFJlY3QgfSBmcm9tICdvcGVuZmluL192Mi9hcGkvc3lzdGVtL21vbml0b3InO1xuXG4vLyB1c2VkIHRvIHJlcHJlc2VudCBwb2ludGVyIHBvc2l0aW9uXG5leHBvcnQgaW50ZXJmYWNlIFBvc2l0aW9uIHtcbiAgICB0b3A6IG51bWJlcjtcbiAgICBsZWZ0OiBudW1iZXI7XG59XG5cbi8vIHNpbXBsZSByZWN0YW5nbGUgaW50ZXJmYWN0XG5leHBvcnQgaW50ZXJmYWNlIFIge1xuICAgIGxlZnQ6IG51bWJlcjtcbiAgICB0b3A6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xufVxuXG4vLyBzaW1wbGUgbW9uaXRvciBpbnRlcmZhY2UgLSB3aXRoIGJvdGggZnVsbCBhbmQgYXZhaWxhYmxlIHJlY3RhbmdsZXNcbmludGVyZmFjZSBNb25pdG9ySW5mbyB7XG4gICAgZnVsbFJlY3Q6IFJlY3RhbmdsZTtcbiAgICBhdmFpbGFibGVSZWN0OiBSZWN0YW5nbGU7XG59XG5cbi8vIHJlY3RhbmdsZSBpbXBsZW1lbnRhdGlvbiAtIGNvbGxpZGVzV2l0aChyZWN0KSBhbmQgY29udGFpbnMoeHkpXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGltcGxlbWVudHMgUiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGxlZnQ6IG51bWJlcjtcbiAgICB0b3A6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsIGxlZnQ6bnVtYmVyLCB0b3A6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICAgICAgdGhpcy50b3AgPSB0b3A7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIGNvbGxpZGVzV2l0aChyZWN0OlIpOmJvb2xlYW4ge1xuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gcmVjdDtcbiAgICAgICAgaWYgKHRoaXMubGVmdCA8PSBsZWZ0ICsgd2lkdGggJiYgdGhpcy5sZWZ0ICsgdGhpcy53aWR0aCA+PSBsZWZ0ICYmXG4gICAgICAgICAgICB0aGlzLnRvcCA8PSB0b3AgKyBoZWlnaHQgJiYgdGhpcy50b3AgKyB0aGlzLmhlaWdodCA+PSB0b3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29udGFpbnMoeHk6UG9zaXRpb24pOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCh0aGlzLmxlZnQgPD0geHkubGVmdCkgJiYgKHh5LmxlZnQgPD0gKHRoaXMubGVmdCArIHRoaXMud2lkdGgpKSBcbiAgICAgICAgICAgICYmICh0aGlzLnRvcCA8PSB4eS50b3ApICYmICh4eS50b3AgPD0gKHRoaXMudG9wICsgdGhpcy5oZWlnaHQpKSk7XG4gICAgfVxufVxuXG4vKipcbiAqICBUaWxlcjogV2luZG93IHRpbGluZyBoZWxwZXJcbiAqICAgICAtIGNhbiBcImZpdFwiIHdpbmRvd3MgaW50byBhbiBhcmVhIG9mIGEgc2NyZWVuIGJhc2VkIG9uIHBlcmNlbnRhZ2VzXG4gKiAgICAgLSBjYW4gY2VudGVyIHdpbmRvd3MgaW4gYW4gYXJlYSBvZiBhIHNjcmVlbiwgb3B0aW9uYWxseSBwYXNzaW5nIG5ldyBwZXJjZW50YWdlIGJhc2VkIGhlaWdodC93aWR0aFxuICovXG5leHBvcnQgY2xhc3MgVGlsZXIge1xuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSB3aW5kb3csIGZpdCBpdCBpbnRvIHRoZSByZWN0YW5nbGVcbiAgICAgKiBAcGFyYW0gd2luIE9wZW5GaW4gd2luZG93XG4gICAgICogQHBhcmFtIGFyZWEgYXJlYSB0byBmaXQgd2luZG93IGludG9cbiAgICAgKiBAcGFyYW0gbGVmdCBsZWZ0IGVkZ2UgbG9jYXRpb24gYXMgYSBwZXJjdGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIHRvcCB0b3AgZWRnZSBsb2NhdGlvbiBhcyBhIHBlcmN0YWdlIG9mIGFyZWFcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIGhlaWdodCBoZWlnaHQgb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIGZpdCh3aW46X1dpbmRvdywgYXJlYTpSZWN0YW5nbGUsIGxlZnQ6bnVtYmVyLCB0b3A6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOlByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBuZXdEaW1zID0gVGlsZXIuY2FsY0Rlc3RSZWN0KGFyZWEsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIC8vIFdBUk5JTkc6IHJlbW92ZSBuYW1lIHByb3BlcnR5IGZyb20gUmVjdGFuZ2xlL0JvdW5kcyBvYmplY3QuXG4gICAgICAgIC8vICAgIFRoZSBWMiBBUEkgZG9lcyBhbiBPYmplY3QuYXNzaWduKElkZW50aXR5LCBCb3VuZHMpIHNvIEJvdW5kcy5uYW1lIHdpbGwgb3ZlcnJpZGUgSWRlbnRpdHkubmFtZVxuICAgICAgICBkZWxldGUgbmV3RGltcy5uYW1lO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgd2luLnNldEJvdW5kcyhuZXdEaW1zKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmaXR0aW5nIHdpbmRvdyAke3dpbi5pZGVudGl0eS51dWlkfS8ke3dpbi5pZGVudGl0eS5uYW1lfSB0byBzaXplOiAke0pTT04uc3RyaW5naWZ5KG5ld0RpbXMpfWAsIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSB3aW5kb3cgaWRlbnRpdHksIHdyYXAgaXQgYW5kIHRoZW4gZml0IGl0XG4gICAgICogQHBhcmFtIHdpbklEIGlkZW50aXR5IG9mIE9wZW5GaW4gd2luZG93ICh1dWlkL25hbWUpXG4gICAgICogQHBhcmFtIGFyZWEgYXJlYSB0byBmaXQgd2luZG93IGludG9cbiAgICAgKiBAcGFyYW0gbGVmdCBsZWZ0IGVkZ2UgbG9jYXRpb24gYXMgYSBwZXJjdGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIHRvcCB0b3AgZWRnZSBsb2NhdGlvbiBhcyBhIHBlcmN0YWdlIG9mIGFyZWFcbiAgICAgKiBAcGFyYW0gd2lkdGggd2lkdGggb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIGhlaWdodCBoZWlnaHQgb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHdyYXBBbmRGaXQod2luSUQ6SWRlbnRpdHksIGFyZWE6UmVjdGFuZ2xlLCBsZWZ0Om51bWJlciwgdG9wOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKTpQcm9taXNlPF9XaW5kb3d8bnVsbD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMod2luSUQpO1xuICAgICAgICAgICAgYXdhaXQgVGlsZXIuZml0KHcsIGFyZWEsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdztcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmaXR0aW5nIHdpbmRvdyAke3dpbklELnV1aWR9LyR7d2luSUQubmFtZX1gLCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnaXZlbiBhIHdpbmRvdywgY2VudGVyIGl0IG9uIHRoZSBjdXJyZW50IG1vbml0b3IsIG9wdGlvbmFsIHBlcmNlbnRhZ2UgYmFzZWQgaGVpZ2h0L3dpZHRoXG4gICAgICogQHBhcmFtIHdpbiBPcGVuRmluIHdpbmRvd1xuICAgICAqIEBwYXJhbSBuZXd3aWR0aCBuZXcgd2lkdGggb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKiBAcGFyYW0gbmV3aGVpZ2h0IG5ldyBoZWlnaHQgb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgY2VudGVyKHdpbjpfV2luZG93LCBuZXd3aWR0aD86bnVtYmVyLCBuZXdoZWlnaHQ/Om51bWJlcik6UHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBhd2FpdCBUaWxlci5nZXRNb25pdG9yRm9yV2luZG93KHdpbik7XG4gICAgICAgIHJldHVybiBUaWxlci5jZW50ZXJXaXRoaW4od2luLCByZWN0ISwgbmV3d2lkdGgsIG5ld2hlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSB3aW5kb3csIHdyYXAgYW5kIGNlbnRlciBpdCB3aXRoaW4gYW4gYXJlYVxuICAgICAqIEBwYXJhbSB3aW4gT3BlbkZpbiB3aW5kb3dcbiAgICAgKiBAcGFyYW0gYXJlYSBhcmVhIHRvIGNlbnRlciB3aW5kb3cgd2l0aGluXG4gICAgICogQHBhcmFtIG5ld3dpZHRoIG5ldyB3aWR0aCBvZiB3aW5kb3cgYXMgYSBwZXJjZW50YWdlIG9mIGFyZWEgKG9wdGlvbmFsKVxuICAgICAqIEBwYXJhbSBuZXdoZWlnaHQgbmV3IGhlaWdodCBvZiB3aW5kb3cgYXMgYSBwZXJjZW50YWdlIG9mIGFyZWEgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBjZW50ZXJXaXRoaW4od2luOl9XaW5kb3csIGFyZWE6UmVjdGFuZ2xlLCBuZXd3aWR0aD86bnVtYmVyLCBuZXdoZWlnaHQ/Om51bWJlcik6UHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGxldCB0b3AgPSAwO1xuICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICAgIGxldCBoZWlnaHQgPSAwO1xuICAgICAgICBjb25zdCBiID0gYXdhaXQgd2luLmdldEJvdW5kcygpO1xuICAgICAgICBpZiAobmV3d2lkdGgpIHtcbiAgICAgICAgICAgIGxlZnQgPSAoMTAwIC0gbmV3d2lkdGgpIC8gMjtcbiAgICAgICAgICAgIHdpZHRoID0gbmV3d2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCA9IChiLndpZHRoL2FyZWEud2lkdGgpICogMTAwO1xuICAgICAgICAgICAgbGVmdCA9ICgxMDAtd2lkdGgpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3aGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSAoMTAwIC0gbmV3aGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICBoZWlnaHQgPSBuZXdoZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWlnaHQgPSAoYi5oZWlnaHQvYXJlYS5oZWlnaHQpICogMTAwO1xuICAgICAgICAgICAgdG9wID0gKDEwMC1oZWlnaHQpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVGlsZXIuZml0KHdpbiwgYXJlYSwgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnaXZlbiBhIHdpbmRvdyBpZGVudGl0eSwgd3JhcCBpdCBhbmQgdGhlbiBjZW50ZXIgaXRcbiAgICAgKiBAcGFyYW0gd2luSUQgaWRlbnRpdHkgb2YgT3BlbkZpbiB3aW5kb3cgKHV1aWQvbmFtZSlcbiAgICAgKiBAcGFyYW0gbmV3d2lkdGggbmV3IHdpZHRoIG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICogQHBhcmFtIG5ld2hlaWdodCBuZXcgaGVpZ2h0IG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHdyYXBBbmRDZW50ZXIod2luSUQ6SWRlbnRpdHksIG5ld3dpZHRoPzpudW1iZXIsIG5ld2hlaWdodD86bnVtYmVyKTpQcm9taXNlPF9XaW5kb3c+IHtcbiAgICAgICAgY29uc3QgdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMod2luSUQpO1xuICAgICAgICBUaWxlci5jZW50ZXIodywgbmV3d2lkdGgsIG5ld2hlaWdodCk7XG4gICAgICAgIHJldHVybiB3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdpdmVuIGEgd2luZG93IGlkZW50aXR5LCB3cmFwIGl0IGFuZCB0aGVuIGNlbnRlciBpdCB3aXRoIHRoZSBhcmVhXG4gICAgICogQHBhcmFtIHdpbklEIGlkZW50aXR5IG9mIE9wZW5GaW4gd2luZG93ICh1dWlkL25hbWUpXG4gICAgICogQHBhcmFtIGFyZWEgYXJlYSB0byBjZW50ZXIgd2luZG93IHdpdGhpblxuICAgICAqIEBwYXJhbSBuZXd3aWR0aCBuZXcgd2lkdGggb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKiBAcGFyYW0gbmV3aGVpZ2h0IG5ldyBoZWlnaHQgb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgd3JhcEFuZENlbnRlcldpdGhpbih3aW5JRDpJZGVudGl0eSwgYXJlYTpSZWN0YW5nbGUsIG5ld3dpZHRoPzpudW1iZXIsIG5ld2hlaWdodD86bnVtYmVyKTpQcm9taXNlPF9XaW5kb3c+IHtcbiAgICAgICAgY29uc3QgdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMod2luSUQpO1xuICAgICAgICBUaWxlci5jZW50ZXJXaXRoaW4odywgYXJlYSwgbmV3d2lkdGgsIG5ld2hlaWdodCk7XG4gICAgICAgIHJldHVybiB3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybiBtb25pdG9yIGluZm8gZm9yIGEgcG9pbnQgKHR5cGljYWxseSB0aGUgY3Vyc29yIHBvc2l0aW9uKVxuICAgICAqIEBwYXJhbSBwIHRoZSBwb3NpdGlvbi9wb2ludCB0byByZWZlcmVuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgZ2V0TW9uaXRvckZvclBvc2l0aW9uKHA6UG9zaXRpb24pOlByb21pc2U8UmVjdGFuZ2xlfG51bGw+IHtcbiAgICAgICAgY29uc3QgbW9uaXRvcnMgPSBhd2FpdCBUaWxlci5jb2xsZWN0TW9uaXRvcnMoKTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPG1vbml0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCByZWN0ID0gbW9uaXRvcnNbaV0uZnVsbFJlY3Q7XG4gICAgICAgICAgICBpZiAocmVjdC5jb250YWlucyhwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb25pdG9yc1tpXS5hdmFpbGFibGVSZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb25pdG9yc1swXS5hdmFpbGFibGVSZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJldHVybiBtb25pdG9yIGluZm8gZm9yIGEgd2luZG93IChiYXNlZCBvbiB0b3AvbGVmdCBvZiBtb25pdG9yKVxuICAgICAqICAgVE9ETzogaW52ZXN0aWdhdGUgdXNpbmcgYXJlYSBvdmVybGFwIG9mIG1vbml0b3Ivd2luZG93IChwcm9iYWJseSBPUyBzcGVjaWZpYylcbiAgICAgKiBAcGFyYW0gdyB0aGUgd2luZG93IHRvIHJlZmVyZW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBnZXRNb25pdG9yRm9yV2luZG93KHc6X1dpbmRvdyk6UHJvbWlzZTxSZWN0YW5nbGV8bnVsbD4ge1xuICAgICAgICBjb25zdCBib3VuZHMgPSBhd2FpdCB3LmdldEJvdW5kcygpO1xuICAgICAgICByZXR1cm4gVGlsZXIuZ2V0TW9uaXRvckZvclBvc2l0aW9uKGJvdW5kcyk7XG4gICAgfVxuXG4gICAgLy8gZ2l2ZW4gYW4gYXJlYSwgdHJhbnNsYXRlIGxlZnQsIHRvcCwgd2lkdGggYW5kIGhlaWdodCBmcm9tIHBlcmNlbnRhZ2VzIHRvIHBpeGVsc1xuICAgIHByaXZhdGUgc3RhdGljIGNhbGNEZXN0UmVjdChhcmVhOlJlY3RhbmdsZSwgbGVmdDpudW1iZXIsIHRvcDpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6UmVjdGFuZ2xlIHtcbiAgICAgICAgaWYgKGxlZnQgPCAwKSBsZWZ0ID0gMDtcbiAgICAgICAgaWYgKGxlZnQgPiAxMDApIGxlZnQgPSAxMDA7XG4gICAgICAgIGlmICh0b3AgPCAwKSBsZWZ0ID0gMDtcbiAgICAgICAgaWYgKHRvcCA+IDEwMCkgbGVmdCA9IDEwMDtcbiAgICAgICAgaWYgKHdpZHRoIDwgMCkgbGVmdCA9IDA7XG4gICAgICAgIGlmICh3aWR0aCA+IDEwMCkgbGVmdCA9IDEwMDtcbiAgICAgICAgaWYgKGhlaWdodCA8IDApIGxlZnQgPSAwO1xuICAgICAgICBpZiAoaGVpZ2h0ID4gMTAwKSBsZWZ0ID0gMTAwO1xuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSgnZGVzdCcsIGFyZWEubGVmdCsoYXJlYS53aWR0aCoobGVmdC8xMDApKSwgYXJlYS50b3ArKGFyZWEuaGVpZ2h0Kih0b3AvMTAwKSksIGFyZWEud2lkdGgqKHdpZHRoLzEwMCksIGFyZWEuaGVpZ2h0KihoZWlnaHQvMTAwKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IG1vbml0b3IgaW5mbyAtIHJldHVybnMgYXZhaWxhYmxlIGFuZCBmdWxsIHJlY3RhbmdsZXNcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBjb2xsZWN0TW9uaXRvcnMoKTpQcm9taXNlPE1vbml0b3JJbmZvW10+IHtcbiAgICAgICAgY29uc3QgbW9uSW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0TW9uaXRvckluZm8oKTtcbiAgICAgICAgY29uc3QgbW9uaXRvcnM6TW9uaXRvckluZm9bXSA9IFtdO1xuICAgICAgICBsZXQgbW9uOk1vbml0b3JJbmZvID0ge1xuICAgICAgICAgICAgZnVsbFJlY3Q6IFRpbGVyLm1ha2VNb25pdG9yUmVjdChtb25JbmZvLnByaW1hcnlNb25pdG9yLm5hbWUsIG1vbkluZm8ucHJpbWFyeU1vbml0b3IubW9uaXRvclJlY3QpLFxuICAgICAgICAgICAgYXZhaWxhYmxlUmVjdDogVGlsZXIubWFrZU1vbml0b3JSZWN0KG1vbkluZm8ucHJpbWFyeU1vbml0b3IubmFtZSwgbW9uSW5mby5wcmltYXJ5TW9uaXRvci5hdmFpbGFibGVSZWN0KVxuICAgICAgICB9O1xuICAgICAgICBtb25pdG9ycy5wdXNoKG1vbik7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxtb25JbmZvLm5vblByaW1hcnlNb25pdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9uUEluZm8gPSBtb25JbmZvLm5vblByaW1hcnlNb25pdG9yc1tpXTtcbiAgICAgICAgICAgIG1vbiA9IHtcbiAgICAgICAgICAgICAgICBmdWxsUmVjdDogVGlsZXIubWFrZU1vbml0b3JSZWN0KG5vblBJbmZvLm5hbWUsIG5vblBJbmZvLm1vbml0b3JSZWN0KSxcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVSZWN0OiBUaWxlci5tYWtlTW9uaXRvclJlY3Qobm9uUEluZm8ubmFtZSwgbm9uUEluZm8uYXZhaWxhYmxlUmVjdClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtb25pdG9ycy5wdXNoKG1vbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vbml0b3JzO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBhIFJlY3RhbmdlIGZyb20gYSBtb25pdG9yJ3MgUmVjdFxuICAgIHByaXZhdGUgc3RhdGljIG1ha2VNb25pdG9yUmVjdChuYW1lOnN0cmluZywgbW9uOlJlY3QpOlJlY3RhbmdsZSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKG5hbWUsIG1vbi5sZWZ0LCBtb24udG9wLCBtb24ucmlnaHQtbW9uLmxlZnQsIG1vbi5ib3R0b20tbW9uLnRvcCk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=