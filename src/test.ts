import { _Window } from 'openfin/_v2/api/window/window';
import {Tiler} from './tiler';

document.addEventListener("DOMContentLoaded", () => {

    let winCount = 0;
    const defaultWinCount = 2;

    const createWindow = () => {
        const winConfig = {
            name : `tiler-test-window-${winCount}`,
            url: `test.html`,
            defaultHeight: 400,
            defaultWidth: 400,
            defaultTop: 100 + (winCount+1)*30,
            defaultLeft: 100 + (winCount+1)*30,
            saveWindowState: false,
            autoShow: true
        };
    
        try {
            fin.Window.create(winConfig);
            winCount++;
        } catch(e) {

        }
    };

    document.getElementById('createAnotherWindow')!.addEventListener('click', () => {
        createWindow();
    });
    
    document.getElementById('centerme')!.addEventListener('click', () => {
        const me = fin.Window.getCurrentSync();
        Tiler.center(me);
    });

    document.getElementById('centerme5050')!.addEventListener('click', () => {
        const me = fin.Window.getCurrentSync();
        Tiler.center(me, 50, 50);
    });

    document.getElementById('centermehalf')!.addEventListener('click', async () => {
        const me = fin.Window.getCurrentSync();
        const rect = await Tiler.getMonitorForWindow(me);
        rect!.width = rect!.width/2;
        Tiler.centerWithin(me, rect!);
    });

    for (let i = 0; i < defaultWinCount; i++) {
        createWindow();
    }

});
