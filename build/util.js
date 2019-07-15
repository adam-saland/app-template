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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tiler.ts");
/******/ })
/************************************************************************/
/******/ ({

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxREE7QUFBQTtBQUFBO0FBQUEsaUVBQWlFO0FBQzFELE1BQU0sU0FBUztJQU9sQixZQUFZLElBQVcsRUFBRSxJQUFXLEVBQUUsR0FBVSxFQUFFLEtBQVksRUFBRSxNQUFhO1FBQ3pFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNELFlBQVksQ0FB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O0lBQ3JDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBVyxFQUFFLEdBQVE7UUFDaEQsT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0oiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbGVyLnRzXCIpO1xuIiwiaW1wb3J0IHsgSWRlbnRpdHkgfSBmcm9tICdvcGVuZmluL192Mi9tYWluJztcbmltcG9ydCB7IF9XaW5kb3cgfSBmcm9tICdvcGVuZmluL192Mi9hcGkvd2luZG93L3dpbmRvdyc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnb3BlbmZpbi9fdjIvYXBpL3N5c3RlbS9tb25pdG9yJztcblxuLy8gdXNlZCB0byByZXByZXNlbnQgcG9pbnRlciBwb3NpdGlvblxuZXhwb3J0IGludGVyZmFjZSBQb3NpdGlvbiB7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgbGVmdDogbnVtYmVyO1xufVxuXG4vLyBzaW1wbGUgcmVjdGFuZ2xlIGludGVyZmFjdFxuZXhwb3J0IGludGVyZmFjZSBSIHtcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcbn1cblxuLy8gc2ltcGxlIG1vbml0b3IgaW50ZXJmYWNlIC0gd2l0aCBib3RoIGZ1bGwgYW5kIGF2YWlsYWJsZSByZWN0YW5nbGVzXG5pbnRlcmZhY2UgTW9uaXRvckluZm8ge1xuICAgIGZ1bGxSZWN0OiBSZWN0YW5nbGU7XG4gICAgYXZhaWxhYmxlUmVjdDogUmVjdGFuZ2xlO1xufVxuXG4vLyByZWN0YW5nbGUgaW1wbGVtZW50YXRpb24gLSBjb2xsaWRlc1dpdGgocmVjdCkgYW5kIGNvbnRhaW5zKHh5KVxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBpbXBsZW1lbnRzIFIge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsZWZ0OiBudW1iZXI7XG4gICAgdG9wOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLCBsZWZ0Om51bWJlciwgdG9wOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMudG9wID0gdG9wO1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICBjb2xsaWRlc1dpdGgocmVjdDpSKTpib29sZWFuIHtcbiAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQgfSA9IHJlY3Q7XG4gICAgICAgIGlmICh0aGlzLmxlZnQgPD0gbGVmdCArIHdpZHRoICYmIHRoaXMubGVmdCArIHRoaXMud2lkdGggPj0gbGVmdCAmJlxuICAgICAgICAgICAgdGhpcy50b3AgPD0gdG9wICsgaGVpZ2h0ICYmIHRoaXMudG9wICsgdGhpcy5oZWlnaHQgPj0gdG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnRhaW5zKHh5OlBvc2l0aW9uKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICgodGhpcy5sZWZ0IDw9IHh5LmxlZnQpICYmICh4eS5sZWZ0IDw9ICh0aGlzLmxlZnQgKyB0aGlzLndpZHRoKSkgXG4gICAgICAgICAgICAmJiAodGhpcy50b3AgPD0geHkudG9wKSAmJiAoeHkudG9wIDw9ICh0aGlzLnRvcCArIHRoaXMuaGVpZ2h0KSkpO1xuICAgIH1cbn1cblxuLyoqXG4gKiAgVGlsZXI6IFdpbmRvdyB0aWxpbmcgaGVscGVyXG4gKiAgICAgLSBjYW4gXCJmaXRcIiB3aW5kb3dzIGludG8gYW4gYXJlYSBvZiBhIHNjcmVlbiBiYXNlZCBvbiBwZXJjZW50YWdlc1xuICogICAgIC0gY2FuIGNlbnRlciB3aW5kb3dzIGluIGFuIGFyZWEgb2YgYSBzY3JlZW4sIG9wdGlvbmFsbHkgcGFzc2luZyBuZXcgcGVyY2VudGFnZSBiYXNlZCBoZWlnaHQvd2lkdGhcbiAqL1xuZXhwb3J0IGNsYXNzIFRpbGVyIHtcblxuICAgIC8qKlxuICAgICAqIGdpdmVuIGEgd2luZG93LCBmaXQgaXQgaW50byB0aGUgcmVjdGFuZ2xlXG4gICAgICogQHBhcmFtIHdpbiBPcGVuRmluIHdpbmRvd1xuICAgICAqIEBwYXJhbSBhcmVhIGFyZWEgdG8gZml0IHdpbmRvdyBpbnRvXG4gICAgICogQHBhcmFtIGxlZnQgbGVmdCBlZGdlIGxvY2F0aW9uIGFzIGEgcGVyY3RhZ2Ugb2YgYXJlYVxuICAgICAqIEBwYXJhbSB0b3AgdG9wIGVkZ2UgbG9jYXRpb24gYXMgYSBwZXJjdGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYVxuICAgICAqIEBwYXJhbSBoZWlnaHQgaGVpZ2h0IG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyBmaXQod2luOl9XaW5kb3csIGFyZWE6UmVjdGFuZ2xlLCBsZWZ0Om51bWJlciwgdG9wOm51bWJlciwgd2lkdGg6bnVtYmVyLCBoZWlnaHQ6bnVtYmVyKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgbmV3RGltcyA9IFRpbGVyLmNhbGNEZXN0UmVjdChhcmVhLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAvLyBXQVJOSU5HOiByZW1vdmUgbmFtZSBwcm9wZXJ0eSBmcm9tIFJlY3RhbmdsZS9Cb3VuZHMgb2JqZWN0LlxuICAgICAgICAvLyAgICBUaGUgVjIgQVBJIGRvZXMgYW4gT2JqZWN0LmFzc2lnbihJZGVudGl0eSwgQm91bmRzKSBzbyBCb3VuZHMubmFtZSB3aWxsIG92ZXJyaWRlIElkZW50aXR5Lm5hbWVcbiAgICAgICAgZGVsZXRlIG5ld0RpbXMubmFtZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHdpbi5zZXRCb3VuZHMobmV3RGltcyk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZml0dGluZyB3aW5kb3cgJHt3aW4uaWRlbnRpdHkudXVpZH0vJHt3aW4uaWRlbnRpdHkubmFtZX0gdG8gc2l6ZTogJHtKU09OLnN0cmluZ2lmeShuZXdEaW1zKX1gLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdpdmVuIGEgd2luZG93IGlkZW50aXR5LCB3cmFwIGl0IGFuZCB0aGVuIGZpdCBpdFxuICAgICAqIEBwYXJhbSB3aW5JRCBpZGVudGl0eSBvZiBPcGVuRmluIHdpbmRvdyAodXVpZC9uYW1lKVxuICAgICAqIEBwYXJhbSBhcmVhIGFyZWEgdG8gZml0IHdpbmRvdyBpbnRvXG4gICAgICogQHBhcmFtIGxlZnQgbGVmdCBlZGdlIGxvY2F0aW9uIGFzIGEgcGVyY3RhZ2Ugb2YgYXJlYVxuICAgICAqIEBwYXJhbSB0b3AgdG9wIGVkZ2UgbG9jYXRpb24gYXMgYSBwZXJjdGFnZSBvZiBhcmVhXG4gICAgICogQHBhcmFtIHdpZHRoIHdpZHRoIG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYVxuICAgICAqIEBwYXJhbSBoZWlnaHQgaGVpZ2h0IG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyB3cmFwQW5kRml0KHdpbklEOklkZW50aXR5LCBhcmVhOlJlY3RhbmdsZSwgbGVmdDpudW1iZXIsIHRvcDpudW1iZXIsIHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcik6UHJvbWlzZTxfV2luZG93fG51bGw+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHcgPSBmaW4uV2luZG93LndyYXBTeW5jKHdpbklEKTtcbiAgICAgICAgICAgIGF3YWl0IFRpbGVyLmZpdCh3LCBhcmVhLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHc7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZml0dGluZyB3aW5kb3cgJHt3aW5JRC51dWlkfS8ke3dpbklELm5hbWV9YCwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSB3aW5kb3csIGNlbnRlciBpdCBvbiB0aGUgY3VycmVudCBtb25pdG9yLCBvcHRpb25hbCBwZXJjZW50YWdlIGJhc2VkIGhlaWdodC93aWR0aFxuICAgICAqIEBwYXJhbSB3aW4gT3BlbkZpbiB3aW5kb3dcbiAgICAgKiBAcGFyYW0gbmV3d2lkdGggbmV3IHdpZHRoIG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICogQHBhcmFtIG5ld2hlaWdodCBuZXcgaGVpZ2h0IG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIGNlbnRlcih3aW46X1dpbmRvdywgbmV3d2lkdGg/Om51bWJlciwgbmV3aGVpZ2h0PzpudW1iZXIpOlByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCByZWN0ID0gYXdhaXQgVGlsZXIuZ2V0TW9uaXRvckZvcldpbmRvdyh3aW4pO1xuICAgICAgICByZXR1cm4gVGlsZXIuY2VudGVyV2l0aGluKHdpbiwgcmVjdCEsIG5ld3dpZHRoLCBuZXdoZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdpdmVuIGEgd2luZG93LCB3cmFwIGFuZCBjZW50ZXIgaXQgd2l0aGluIGFuIGFyZWFcbiAgICAgKiBAcGFyYW0gd2luIE9wZW5GaW4gd2luZG93XG4gICAgICogQHBhcmFtIGFyZWEgYXJlYSB0byBjZW50ZXIgd2luZG93IHdpdGhpblxuICAgICAqIEBwYXJhbSBuZXd3aWR0aCBuZXcgd2lkdGggb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKiBAcGFyYW0gbmV3aGVpZ2h0IG5ldyBoZWlnaHQgb2Ygd2luZG93IGFzIGEgcGVyY2VudGFnZSBvZiBhcmVhIChvcHRpb25hbClcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgY2VudGVyV2l0aGluKHdpbjpfV2luZG93LCBhcmVhOlJlY3RhbmdsZSwgbmV3d2lkdGg/Om51bWJlciwgbmV3aGVpZ2h0PzpudW1iZXIpOlByb21pc2U8dm9pZD4ge1xuICAgICAgICBsZXQgdG9wID0gMDtcbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuICAgICAgICBsZXQgd2lkdGggPSAwO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICAgICAgY29uc3QgYiA9IGF3YWl0IHdpbi5nZXRCb3VuZHMoKTtcbiAgICAgICAgaWYgKG5ld3dpZHRoKSB7XG4gICAgICAgICAgICBsZWZ0ID0gKDEwMCAtIG5ld3dpZHRoKSAvIDI7XG4gICAgICAgICAgICB3aWR0aCA9IG5ld3dpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSAoYi53aWR0aC9hcmVhLndpZHRoKSAqIDEwMDtcbiAgICAgICAgICAgIGxlZnQgPSAoMTAwLXdpZHRoKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld2hlaWdodCkge1xuICAgICAgICAgICAgdG9wID0gKDEwMCAtIG5ld2hlaWdodCkgLyAyO1xuICAgICAgICAgICAgaGVpZ2h0ID0gbmV3aGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVpZ2h0ID0gKGIuaGVpZ2h0L2FyZWEuaGVpZ2h0KSAqIDEwMDtcbiAgICAgICAgICAgIHRvcCA9ICgxMDAtaGVpZ2h0KSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFRpbGVyLmZpdCh3aW4sIGFyZWEsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2l2ZW4gYSB3aW5kb3cgaWRlbnRpdHksIHdyYXAgaXQgYW5kIHRoZW4gY2VudGVyIGl0XG4gICAgICogQHBhcmFtIHdpbklEIGlkZW50aXR5IG9mIE9wZW5GaW4gd2luZG93ICh1dWlkL25hbWUpXG4gICAgICogQHBhcmFtIG5ld3dpZHRoIG5ldyB3aWR0aCBvZiB3aW5kb3cgYXMgYSBwZXJjZW50YWdlIG9mIGFyZWEgKG9wdGlvbmFsKVxuICAgICAqIEBwYXJhbSBuZXdoZWlnaHQgbmV3IGhlaWdodCBvZiB3aW5kb3cgYXMgYSBwZXJjZW50YWdlIG9mIGFyZWEgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyB3cmFwQW5kQ2VudGVyKHdpbklEOklkZW50aXR5LCBuZXd3aWR0aD86bnVtYmVyLCBuZXdoZWlnaHQ/Om51bWJlcik6UHJvbWlzZTxfV2luZG93PiB7XG4gICAgICAgIGNvbnN0IHcgPSBmaW4uV2luZG93LndyYXBTeW5jKHdpbklEKTtcbiAgICAgICAgVGlsZXIuY2VudGVyKHcsIG5ld3dpZHRoLCBuZXdoZWlnaHQpO1xuICAgICAgICByZXR1cm4gdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnaXZlbiBhIHdpbmRvdyBpZGVudGl0eSwgd3JhcCBpdCBhbmQgdGhlbiBjZW50ZXIgaXQgd2l0aCB0aGUgYXJlYVxuICAgICAqIEBwYXJhbSB3aW5JRCBpZGVudGl0eSBvZiBPcGVuRmluIHdpbmRvdyAodXVpZC9uYW1lKVxuICAgICAqIEBwYXJhbSBhcmVhIGFyZWEgdG8gY2VudGVyIHdpbmRvdyB3aXRoaW5cbiAgICAgKiBAcGFyYW0gbmV3d2lkdGggbmV3IHdpZHRoIG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICogQHBhcmFtIG5ld2hlaWdodCBuZXcgaGVpZ2h0IG9mIHdpbmRvdyBhcyBhIHBlcmNlbnRhZ2Ugb2YgYXJlYSAob3B0aW9uYWwpXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIHdyYXBBbmRDZW50ZXJXaXRoaW4od2luSUQ6SWRlbnRpdHksIGFyZWE6UmVjdGFuZ2xlLCBuZXd3aWR0aD86bnVtYmVyLCBuZXdoZWlnaHQ/Om51bWJlcik6UHJvbWlzZTxfV2luZG93PiB7XG4gICAgICAgIGNvbnN0IHcgPSBmaW4uV2luZG93LndyYXBTeW5jKHdpbklEKTtcbiAgICAgICAgVGlsZXIuY2VudGVyV2l0aGluKHcsIGFyZWEsIG5ld3dpZHRoLCBuZXdoZWlnaHQpO1xuICAgICAgICByZXR1cm4gdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gbW9uaXRvciBpbmZvIGZvciBhIHBvaW50ICh0eXBpY2FsbHkgdGhlIGN1cnNvciBwb3NpdGlvbilcbiAgICAgKiBAcGFyYW0gcCB0aGUgcG9zaXRpb24vcG9pbnQgdG8gcmVmZXJlbmNlXG4gICAgICovXG4gICAgc3RhdGljIGFzeW5jIGdldE1vbml0b3JGb3JQb3NpdGlvbihwOlBvc2l0aW9uKTpQcm9taXNlPFJlY3RhbmdsZXxudWxsPiB7XG4gICAgICAgIGNvbnN0IG1vbml0b3JzID0gYXdhaXQgVGlsZXIuY29sbGVjdE1vbml0b3JzKCk7XG4gICAgICAgIGZvciAobGV0IGk9MDsgaTxtb25pdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IG1vbml0b3JzW2ldLmZ1bGxSZWN0O1xuICAgICAgICAgICAgaWYgKHJlY3QuY29udGFpbnMocCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9uaXRvcnNbaV0uYXZhaWxhYmxlUmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW9uaXRvcnNbMF0uYXZhaWxhYmxlUmVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gbW9uaXRvciBpbmZvIGZvciBhIHdpbmRvdyAoYmFzZWQgb24gdG9wL2xlZnQgb2YgbW9uaXRvcilcbiAgICAgKiAgIFRPRE86IGludmVzdGlnYXRlIHVzaW5nIGFyZWEgb3ZlcmxhcCBvZiBtb25pdG9yL3dpbmRvdyAocHJvYmFibHkgT1Mgc3BlY2lmaWMpXG4gICAgICogQHBhcmFtIHcgdGhlIHdpbmRvdyB0byByZWZlcmVuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgZ2V0TW9uaXRvckZvcldpbmRvdyh3Ol9XaW5kb3cpOlByb21pc2U8UmVjdGFuZ2xlfG51bGw+IHtcbiAgICAgICAgY29uc3QgYm91bmRzID0gYXdhaXQgdy5nZXRCb3VuZHMoKTtcbiAgICAgICAgcmV0dXJuIFRpbGVyLmdldE1vbml0b3JGb3JQb3NpdGlvbihib3VuZHMpO1xuICAgIH1cblxuICAgIC8vIGdpdmVuIGFuIGFyZWEsIHRyYW5zbGF0ZSBsZWZ0LCB0b3AsIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSBwZXJjZW50YWdlcyB0byBwaXhlbHNcbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjRGVzdFJlY3QoYXJlYTpSZWN0YW5nbGUsIGxlZnQ6bnVtYmVyLCB0b3A6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIpOlJlY3RhbmdsZSB7XG4gICAgICAgIGlmIChsZWZ0IDwgMCkgbGVmdCA9IDA7XG4gICAgICAgIGlmIChsZWZ0ID4gMTAwKSBsZWZ0ID0gMTAwO1xuICAgICAgICBpZiAodG9wIDwgMCkgbGVmdCA9IDA7XG4gICAgICAgIGlmICh0b3AgPiAxMDApIGxlZnQgPSAxMDA7XG4gICAgICAgIGlmICh3aWR0aCA8IDApIGxlZnQgPSAwO1xuICAgICAgICBpZiAod2lkdGggPiAxMDApIGxlZnQgPSAxMDA7XG4gICAgICAgIGlmIChoZWlnaHQgPCAwKSBsZWZ0ID0gMDtcbiAgICAgICAgaWYgKGhlaWdodCA+IDEwMCkgbGVmdCA9IDEwMDtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUoJ2Rlc3QnLCBhcmVhLmxlZnQrKGFyZWEud2lkdGgqKGxlZnQvMTAwKSksIGFyZWEudG9wKyhhcmVhLmhlaWdodCoodG9wLzEwMCkpLCBhcmVhLndpZHRoKih3aWR0aC8xMDApLCBhcmVhLmhlaWdodCooaGVpZ2h0LzEwMCkpO1xuICAgIH1cblxuICAgIC8vIGdldCBtb25pdG9yIGluZm8gLSByZXR1cm5zIGF2YWlsYWJsZSBhbmQgZnVsbCByZWN0YW5nbGVzXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgY29sbGVjdE1vbml0b3JzKCk6UHJvbWlzZTxNb25pdG9ySW5mb1tdPiB7XG4gICAgICAgIGNvbnN0IG1vbkluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldE1vbml0b3JJbmZvKCk7XG4gICAgICAgIGNvbnN0IG1vbml0b3JzOk1vbml0b3JJbmZvW10gPSBbXTtcbiAgICAgICAgbGV0IG1vbjpNb25pdG9ySW5mbyA9IHtcbiAgICAgICAgICAgIGZ1bGxSZWN0OiBUaWxlci5tYWtlTW9uaXRvclJlY3QobW9uSW5mby5wcmltYXJ5TW9uaXRvci5uYW1lLCBtb25JbmZvLnByaW1hcnlNb25pdG9yLm1vbml0b3JSZWN0KSxcbiAgICAgICAgICAgIGF2YWlsYWJsZVJlY3Q6IFRpbGVyLm1ha2VNb25pdG9yUmVjdChtb25JbmZvLnByaW1hcnlNb25pdG9yLm5hbWUsIG1vbkluZm8ucHJpbWFyeU1vbml0b3IuYXZhaWxhYmxlUmVjdClcbiAgICAgICAgfTtcbiAgICAgICAgbW9uaXRvcnMucHVzaChtb24pO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGk8bW9uSW5mby5ub25QcmltYXJ5TW9uaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vblBJbmZvID0gbW9uSW5mby5ub25QcmltYXJ5TW9uaXRvcnNbaV07XG4gICAgICAgICAgICBtb24gPSB7XG4gICAgICAgICAgICAgICAgZnVsbFJlY3Q6IFRpbGVyLm1ha2VNb25pdG9yUmVjdChub25QSW5mby5uYW1lLCBub25QSW5mby5tb25pdG9yUmVjdCksXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlUmVjdDogVGlsZXIubWFrZU1vbml0b3JSZWN0KG5vblBJbmZvLm5hbWUsIG5vblBJbmZvLmF2YWlsYWJsZVJlY3QpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbW9uaXRvcnMucHVzaChtb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb25pdG9ycztcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgYSBSZWN0YW5nZSBmcm9tIGEgbW9uaXRvcidzIFJlY3RcbiAgICBwcml2YXRlIHN0YXRpYyBtYWtlTW9uaXRvclJlY3QobmFtZTpzdHJpbmcsIG1vbjpSZWN0KTpSZWN0YW5nbGUge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3RhbmdsZShuYW1lLCBtb24ubGVmdCwgbW9uLnRvcCwgbW9uLnJpZ2h0LW1vbi5sZWZ0LCBtb24uYm90dG9tLW1vbi50b3ApO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9