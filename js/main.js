import { html, render } from '../node_modules/lit-html/lit-html.js';

//register service worker
navigator.serviceWorker.register('../serviceworker.js');

class openfinInfo extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.render();
    }
    async render() {
        const info = html`
        <div>
            <h3>
            ${ 'fin' in window
                ? html`
                    OpenFin version: ${await fin.System.getVersion()}
                    Name: ${await fin.Window.getCurrentSync().identity.name}
                `
                : 'The fin API is not available - you are probably running in a browser.'
                
            } 
            </h3>
        </div>
        `;
        render(info, this);
    }
}

class openFinControls extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createChild = this.createChild.bind(this);
        this.addCloseRequested = this.addCloseRequested.bind(this)

        this.render();
    }

    async render() {
        const info = html`
        <div>
            <button @click=${this.addCloseRequested}>Create child window</button>
        </div>
        `;
        render(info, this);
    }

    async createChild() {
        const winName = `child-window-${Date.now()}`;
        return await fin.Window.create({
            name: winName,
            url: location.href
        });
       
    }

    async addCloseRequested() {
        const app = await fin.Application.getCurrent();
        const current = await this.createChild();
        current.on('close-requested', async () => {
            const children = await app.getChildWindows();
            
            console.log("children:", children)
            const targetWindow = children.find(child => child.identity.name === current.identity.name)
            // targetWindows.forEach(w => { w.close(true)}) 
            children.forEach((child) => {
                if(child.identity.name !== targetWindow.identity.name) {
                    child.close(true)
                }

            })
            console.log("tgt:", targetWindow.identity.name)

        }) 

    }
}

customElements.define('openfin-info', openfinInfo);
customElements.define('openfin-controls', openFinControls);
