import { createProvider } from './frame-api.js';
navigator.serviceWorker.register('../serviceworker.js');
(async () => {

    const app = fin.Application.getCurrentSync();

    await app.on('window-closed', async () => {
        const childWindows = await app.getChildWindows();
        if (childWindows.length < 1) {
            app.close();
        }
    });

    //Create "main" window
    const { customData } = await fin.Window.getCurrentSync().getOptions();
    const winOption = {
        name:'child',
        defaultWidth: 700,
        defaultHeight: 900,
        url: location.href.replace("index", "view-container"),
        frame: false,
        autoShow: true,
        customData,
        resizeRegion: {
            bottomRightCorner: 20
        }
    };

    await fin.Window.create(winOption);


    //Create channel
    await createProvider();

})();
