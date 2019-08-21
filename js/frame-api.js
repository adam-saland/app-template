let client = null;

//Provider Logic.
export async function createProvider() {
    const provider = await fin.InterApplicationBus.Channel.create('custom-frame');
    const clients = new Map();

    provider.register('create-view', async({ options, layoutConfig}, identity) => {
        const winOption = Object.assign({
            url: 'http://localhost:5555/view-container.html',
            frame: false,
            autoShow: true,
            customData: layoutConfig
        }, options);

        return fin.Window.create(winOption);
    });

    provider.register('add-view', async({ viewOptions, target }, identity) => {
        const client = provider.connections.find(c => c.name === target.name);
        if (client) {
            return provider.dispatch(client, 'add-view', { viewOptions });
        }

        return new Error(`Client with name ${target.name} not found`);

    });

    return provider;
}


//Client Logic.
export async function getClient() {
    if (client === null) {
        client = await fin.InterApplicationBus.Channel.connect('custom-frame');
    }

    return client;
}

export async function createWindow(layoutConfig) {
    const c = await getClient();

    const createWindowOptions = {
        options: {
            defaultWidth: 700,
            defaultHeight: 900,
            name: `child-window-${Date.now()}`
        },
        layoutConfig
    };
    return await c.dispatch('create-view', createWindowOptions);
}
