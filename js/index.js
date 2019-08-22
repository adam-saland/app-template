import { createProvider } from './frame-api.js';
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
        url: 'http://localhost:5555/view-container.html',
        frame: false,
        autoShow: true,
        customData,
        "resizeRegion": {
            "size": 7
        }
    };

    await fin.Window.create(winOption);


    //Create channel
    await createProvider();

})();
