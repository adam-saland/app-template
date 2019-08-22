let client = null;

//Provider Logic.
export async function createProvider() {
    const provider = await fin.InterApplicationBus.Channel.create('custom-frame');
    const clients = new Map();

    provider.register('create-view', async({ options, layoutConfig}, identity) => {
        const winOption = Object.assign({
            url: location.href.replace("index", "view-container"),
            frame: false,
            autoShow: true,
            customData: layoutConfig
        }, options);

        return fin.Window.create(winOption);
    });

    //If the provider has not defined an action, we forward it to a given target.
    await provider.setDefaultAction(async (action, { target, opts }, identity) => {
        const client = provider.connections.find(c => c.name === target.name);
        if (client) {
            return await provider.dispatch(client, action, opts);
        }
        throw new Error(`Client with name ${target.name} not found`);
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

export async function addViewToWindow(viewConfig, target) {
    const client = await getClient();

    return client.dispatch('add-view', {
        target,
        opts: viewConfig
    });
}

//TODO: this name is suspect.
export async function getViews(target) {
    const client = await getClient();

    return client.dispatch('get-views', {
        target,
        opts: {}
    });
}

export async function removeView(viewConfig, target) {
    const client = await getClient();

    return client.dispatch('remove-view', {
        target,
        opts: viewConfig
    });
}

export async function removeAndCloseView(viewConfig, target) {
    const client = await getClient();

    return client.dispatch('remove-close-view', {
        target,
        opts: viewConfig
    });
}

export async function moveView(viewConfig, sourceWindow, destinationWindow) {
    const client = await getClient();

    await removeView(viewConfig, sourceWindow);
    await addViewToWindow(viewConfig, destinationWindow);
}
