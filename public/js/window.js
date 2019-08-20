async function generateLayoutConfig(view) {
    const {url} = await view.getInfo();

    return {    
        settings: {
            showPopoutIcon: false,
            showMaximiseIcon: false,
            showCloseIcon: false,
            constrainDragToContainer: false
        },
        content: [{
            type: 'row',
            content:[{
                type: 'column',
                content:[{
                    type: 'component',
                    componentName: 'browserView',
                    componentState: {
                        identity: view.identity,
                        url
                    }
                }]
            }]
        }]
    };
}


export default function generateWindowWithView(viewId) {
    return new Promise(async (res, rej) => {
        const client = await fin.InterApplicationBus.Channel.connect('custom-frame');
        const view = await fin.BrowserView.wrapSync(viewId);
        const layoutConfig = await generateLayoutConfig(view);
        try {
            const createViewPayload = {
                options: {
                    defaultWidth: 700,
                    defaultHeight: 900,
                    name: `child-window-${Date.now()}`
                },
                layoutConfig
            };

            await client.dispatch('create-view', createViewPayload);
            res(window);
        } catch (e) {
            rej(e);
        }
    })
}