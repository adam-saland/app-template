import { html, render } from '../node_modules/lit-html/lit-html.js';
import { getClient, createWindow } from './frame-api.js';
//register service worker
//navigator.serviceWorker.register('../serviceworker.js');

const popoutIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 16 16" style=" fill:white;"><g id="surface1"><path style=" " d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 11.5 L 3 10.5 L 3 4 C 3 3.449219 3.449219 3 4 3 L 11 3 C 11.550781 3 12 3.449219 12 4 L 12 12 C 12 12.550781 11.550781 13 11 13 L 5.5 13 L 4.5 14 L 11 14 C 12.101563 14 13 13.101563 13 12 L 13 4 C 13 2.898438 12.101563 2 11 2 Z M 4.464844 8 L 5.878906 9.414063 L 1.023438 14.269531 L 1.726563 14.980469 L 6.585938 10.121094 L 8 11.535156 L 8 8 Z "></path></g></svg>`;
export const closeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" style=" fill:white;"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 11.6875 10.3125 L 10.28125 11.71875 L 14.5625 16 L 10.21875 20.34375 L 11.625 21.75 L 15.96875 17.40625 L 20.28125 21.71875 L 21.6875 20.3125 L 17.375 16 L 21.625 11.75 L 20.21875 10.34375 L 15.96875 14.59375 Z "></path></g></svg>`;
export const minimizeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" style=" fill:white;"><g id="surface1"><path style=" " d="M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 9 20 L 9 22 L 23 22 L 23 20 Z "></path></g></svg>`;
export const maximizeIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50" style=" fill:white;"><g id="surface1"><path style=" " d="M 6 6 L 6 18 C 5.996094 18.359375 6.183594 18.695313 6.496094 18.878906 C 6.808594 19.058594 7.191406 19.058594 7.503906 18.878906 C 7.816406 18.695313 8.003906 18.359375 8 18 L 8 8 L 18 8 C 18.359375 8.003906 18.695313 7.816406 18.878906 7.503906 C 19.058594 7.191406 19.058594 6.808594 18.878906 6.496094 C 18.695313 6.183594 18.359375 5.996094 18 6 Z M 32 6 C 31.460938 5.996094 31.015625 6.425781 30.996094 6.964844 C 30.976563 7.503906 31.390625 7.960938 31.929688 8 C 31.953125 8 31.976563 8 32 8 L 42 8 L 42 18 C 41.992188 18.523438 42.394531 18.964844 42.917969 19.011719 C 42.949219 19.011719 42.980469 19.015625 43.015625 19.015625 C 43.566406 19.003906 44.007813 18.550781 44 18 L 44 6 Z M 6.984375 31.984375 C 6.433594 31.996094 5.992188 32.449219 6 33 L 6 45 L 18 45 C 18.035156 45 18.066406 45 18.097656 44.996094 C 18.632813 44.949219 19.035156 44.484375 19.007813 43.949219 C 18.980469 43.414063 18.535156 42.996094 18 43 L 8 43 L 8 33 C 8.003906 32.730469 7.898438 32.46875 7.707031 32.277344 C 7.515625 32.085938 7.253906 31.980469 6.984375 31.984375 Z M 42.984375 31.984375 C 42.433594 31.996094 41.992188 32.449219 42 33 L 42 43 L 32 43 C 31.640625 42.996094 31.304688 43.183594 31.121094 43.496094 C 30.941406 43.808594 30.941406 44.191406 31.121094 44.503906 C 31.304688 44.816406 31.640625 45.003906 32 45 L 44 45 L 44 33 C 44.003906 32.730469 43.898438 32.46875 43.707031 32.277344 C 43.515625 32.085938 43.253906 31.980469 42.984375 31.984375 Z "></path></g></svg>`;

export default class openfinFrame extends HTMLElement {
    constructor() {
        super();
        this.buildButtons();
        this.render = this.render.bind(this);
        this.render();
    }

    buildButtons () {
        const win = fin.Window.getCurrentSync();
        const closeClick = e => win.close();
        const minimizeClick = e => win.minimize();
        const maximizeClick = async e => win.getState().then(state => state === 'maximized'? win.restore() : win.maximize())

        this.closeButton = html`<div class="button" @click=${closeClick}}>${closeIcon}</div>`;
        this.minimizeButton = html`<div class="button" @click=${minimizeClick}>${minimizeIcon}</div>`;
        this.maximizeButton = html`<div class="button" @click=${maximizeClick}>${maximizeIcon}</div>`;
    }

    async render() {
        const frame = html`
        <div class="container">
            <div class="buttonsWrapper">
                ${this.closeButton}
                ${this.minimizeButton}
                ${this.maximizeButton}
            </div>
        </div>
        `;
        render(frame, this);
    }
}

customElements.define('openfin-frame', openfinFrame);

class goldenLayouts extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.save = this.save.bind(this);
        this.restore = this.restore.bind(this);
        this.restoreDefault = this.restoreDefault.bind(this);
        this.getStorageKey = this.getStorageKey.bind(this);
        this.getDefaultConfig = this.getDefaultConfig.bind(this);
        this.createChannelConnections = this.createChannelConnections.bind(this);
        this.generateLayoutConfig = this.generateLayoutConfig.bind(this);
        this.getBrowserViewComponent = this.getBrowserViewComponent.bind(this);
        this.layout = null;
        this.isDragging = false;


        this.createChannelConnections();
        this.render();
    }

    //TODO: get better names around this.
    async createChannelConnections () {
        //TODO: this could be shared logic somewhere.
        const { identity } = fin.Window.getCurrentSync();
        const channelName = `${identity.uuid}-${identity.name}-custom-frame`;
        this.client = await getClient();

        //TODO: reusing the same name is al sorts of wrong for this thing...do something else.
        this.client.register('add-view', async (viewConfig) => {

            const content = {
                type: 'component',
                componentName: 'browserView',
                componentState: viewConfig
            };

            console.log('adding stuf');
            console.log(this.layout.root.contentItems[ 0 ].addChild(content));

            var bv = this.getBrowserViewComponent(viewConfig.identity);
            const rView = new ResizableView(bv.componentState);
            rView.renderIntoComponent(bv);

            return content;
        });

        this.client.register('get-views', async () => {
            return this.layout.root.getComponentsByName('browserView').map(bv => bv.componentState);
        });

        this.client.register('remove-view', async(viewConfig) => {
            console.log(viewConfig);
            var bv = this.getBrowserViewComponent(viewConfig.identity);
            await fin.BrowserView.wrapSync(viewConfig.identity).hide();
            bv.container.tab.contentItem.remove();
        });
    }

    getBrowserViewComponent(identity) {
        return this.layout.root.getComponentsByName('browserView').find(bv => bv.componentState.identity.name === identity.name);
    }

    getStorageKey() {
        const identity = fin.Window.getCurrentSync().identity;
        return encodeURI(`${identity.uuid}-${identity.name}-of-gl-state`);
    }

    setupListeners() {
        const win = fin.Window.getCurrentSync();
        this.layout.on('tabCreated', this.onTabCreated.bind(this));
        this.layout.on('itemDestroyed', this.onItemDestroyed.bind(this));
        this.layout.on('initialised', this.initializeViews.bind(this));
        win.on('minimized', () => {
            win.once('restored', () => {
                // this.layout.updateSize(); todo: fix.
            });
        });
    }

    onTabCreated(tab) {
        this.isDragging = false;
        const dragListener = tab._dragListener;
        const identity = tab.contentItem.config.componentState.identity;

        this.injectPopoutButton(tab);
        dragListener.on('drag', this.onTabDrag.bind(this, tab._dragListener, identity));
    }

    injectPopoutButton(tab) {
        const onPopooutButtonClick = async () => {
            const viewId = tab.contentItem.container.getState().identity;
            const viewState = tab.contentItem.container.getState();

            const popupLayout = this.generateLayoutConfig(viewState);
            tab.contentItem.remove();
            await createWindow(popupLayout);

        };
        const popoutButton = html`<div @click=${onPopooutButtonClick}>${popoutIcon}</div>`;
        const closeButton = tab.element[0].getElementsByClassName("lm_close_tab")[0];
        const wrapper = document.createElement('div');
        wrapper.className = 'popout-button';
        render(popoutButton, wrapper);
        tab.element[0].insertBefore(wrapper, closeButton);
    }

    onItemDestroyed(e) {
        setTimeout(() => {
            if(e.componentName === 'browserView') {
                const viewCount = this.layout.root.getComponentsByName('browserView').length;
                if(viewCount === 0) {
                    const currWin =  fin.Window.getCurrentSync();
                    currWin.close().catch(console.error);
                }
            }
        }, 0);
    }

    onTabDrag(dragListener, tabIdentity) {
        if(!this.isDragging) {
            this.isDragging = true;

            const allViews = this.layout.root.getComponentsByName('browserView').map(item => item.container.getState().identity);
            allViews.push(tabIdentity); // we have to add currently dragged tab manualy since it's not in the DOM atm
            allViews.forEach(view => fin.BrowserView.wrapSync(view).hide());
            const onDragEnd = (e) => {
                this.isDragging = false;
                allViews.forEach(view => fin.BrowserView.wrapSync(view).show());
                dragListener.off('dragStop', onDragEnd);
                this.updateViewTitles();
            }
            dragListener.on('dragStop', onDragEnd);
        }
    }

    attachViews() {
        const browserViews = this.layout.root.getComponentsByName('browserView');
        browserViews.forEach(bv => {
            const rView = new ResizableView(bv.componentState);
            rView.renderIntoComponent(bv);
        });
    }

    async getDefaultConfig() {
        const { customData } = await fin.Window.getCurrentSync().getOptions();
        return customData;
    }

    async render() {
        //Restore the layout.
        await this.restore();
        this.setupListeners();
        this.layout.init();

        const win = fin.Window.getCurrentSync();

        win.on('close-requested', async () => {
            await this.save();
            await win.close(true);
        });
    }

    async initializeViews() {
        this.attachViews();
        setInterval(this.updateViewTitles.bind(this), 500);
    }

    async updateViewTitles() {
        const allViewWrappers = this.layout.root.getComponentsByName('browserView');
        const allViewIdentities = allViewWrappers.map(item => item.container.getState().identity);
        const allViews = allViewIdentities.map(fin.BrowserView.wrapSync.bind(fin));
        allViews.forEach(async view => {
            const {title} = await view.getInfo();
            const [item] = this.findViewWrapper(view.identity)
            if(!title || !item) console.error(`couldn't update view's title. view: ${JSON.stringify(view)}. title: ${title}. dom elem: ${item}`)
            else {
                item.container.setTitle(title);
                item.container.getElement()[0].innerHTML = `<div class="wrapper_title">${title}</div>`
            }
        });
    }

    async save() {
        if (this.layout) {
            const config = this.layout.toConfig();
            if(!config.content || !config.content.length) return;
            const state = JSON.stringify(config);
            localStorage.setItem(this.getStorageKey(), state);
        }
    }

    findViewWrapper ({name, uuid}) {
        return this.layout.root.getComponentsByName('browserView')
            .filter( wrapper =>
                     wrapper.componentState.identity.name === name &&
                     wrapper.componentState.identity.uuid === uuid
                   );
    }

    //TODO: figure out how to iterate over a saved layout to get the browser view information.
    async restore() {
        const savedState = localStorage.getItem(this.getStorageKey());

        if (this.layout) {
            this.layout.destroy();
        }

        if (savedState !== null) {
            this.layout = new GoldenLayout(JSON.parse(savedState));
        } else {
            const { customData } = await fin.Window.getCurrentSync().getOptions();
            this.layout = new GoldenLayout(customData);
        }

        this.layout.registerComponent( 'browserView', function( container, componentState ){
            return { componentState, container };
        });
    }

    async restoreDefault() {
        localStorage.removeItem(this.getStorageKey());
        this.restore();
    }

    generateLayoutConfig(componentState) {

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
                        componentState
                    }]
                }]
            }]
        };
    }
}

class ResizableView {
    constructor(options) {
        const currWin =  fin.Window.getCurrentSync();
        const identity = { uuid: currWin.identity.uuid, name: options.identity.name };
        this.options = {
            autoResize: {
                width: false,
                height: false
            },
            uuid: identity.uuid,
            name: identity.name,
            url: options.url,
            target: currWin.identity,
            bounds: {
                x: 1,
                y: 1,
                width: 0,
                height: 0
            },
            showDevTools: options.showDevTools
        };
        this.componentKey = `bv-container${ identity.uuid }-${ identity.name }`;
        const resizeObserver = new ResizeObserver( entries => {
            if (this.view) {
                for (let entry of entries) {
                    const cr = entry.contentRect;
                    console.log('Element:', entry.target);
                    console.log(`Element size: ${cr.width}px x ${cr.height}px`);
                    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);

                    var rect = entry.target.getBoundingClientRect();
                    console.log(rect.top, rect.right, rect.bottom, rect.left);
                    // height
                    // width
                    // top
                    // left
                    // right
                    // bottom
                    this.view.setBounds({
                        height: Math.floor(cr.height),
                        width: Math.floor(cr.width),
                        y: Math.floor(rect.top),
                        x: Math.floor(rect.left),
                        right: Math.floor(rect.right),
                        bottom: Math.floor(rect.bottom)
                    }).catch(console.error).then(() => console.log('did it'));
                }
            }
        });

        this.resizeObserver = resizeObserver;
        this.renderIntoComponent = this.renderIntoComponent.bind(this);
    }

    async renderIntoComponent(opts) {
        try {
            this.view = await this.createOrAttachView();
            const { container, componentState } = opts;

            this.resizeObserver.observe(container.getElement()[0]);
        } catch (err) {
            console.error(err);
        }
        return;
    }

    async createOrAttachView() {
        let view;
        try {
            view = await fin.BrowserView.create(this.options);
            view.getInfo && view.getInfo(); // the hackiest hack. remove once we have BV events.
        } catch (e) {
            console.log('in the catch');
            const {identity} = fin.Window.getCurrentSync();
            view = fin.BrowserView.wrapSync({uuid: this.options.uuid, name: this.options.name});

            await view.attach(identity);
        }
        return view;
    }
}
customElements.define('openfin-golden-layouts', goldenLayouts);
