import { html, render } from '../node_modules/lit-html/lit-html.js';

class viewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.generateDefaultConfig = this.generateDefaultConfig.bind(this);
        this.addToView = this.addToView.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.window = fin.Window.getCurrentSync();
        this.channelConnect = this.channelConnect.bind(this);

        //this could be done better.
        fin.Application.getCurrentSync().on('window-created', this.render);
        this.channelConnect();
        this.render();
    }

    async channelConnect() {
        this.client = await fin.InterApplicationBus.Channel.connect('custom-frame');
    }

    async render() {
        this.url2 = 'https://lit-html.polymer-project.org/';
        this.url3 = 'https://developer.mozilla.org/en-US/';
        this.url4 = 'https://cdn.openfin.co/docs/javascript/13.76.44.7/';
        this.urlToAdd = 'https://cdn.openfin.co/docs/javascript/13.76.44.7/';

        //Hard coded code here, caution:
        const app = fin.Application.getCurrentSync();
        const wins = await app.getChildWindows();
        this.selectedWindow = wins[0].identity.name;
        const vForm = html`
        <div>
            <fieldset>
                <legend>Create a new View</legend>
                <button @click=${this.createView}>Create</button> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url2}
                    size="50"
                    @input=${this.handleInput}
                /> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url3}
                    size="50"
                    @input=${this.handleInput}
                /> <br>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url4}
                    size="50"
                    @input=${this.handleInput}
                />
            </fieldset>
            <fieldset>
                <legend>Add view to window</legend>
                <button @click=${this.addToView}>Add</button> <br>
               <input
                    type="text"
                    id="urlToAdd"
                    size="50"
                    .value="${this.urlToAdd}"
                     @input=${this.handleInput}"
                /> <br>
                <select id="pet-select" @change=${(e) => this.selectedWindow = e.srcElement.value}>
                    ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                </select>
             </fieldset>
        </div>`;
        render(vForm, this);
    }

    async addToView() {
        const {identity: { uuid } }  = fin.Application.getCurrentSync();
        const target = { uuid, name: this.selectedWindow };
        await this.client.dispatch('add-view', {
            target,
            viewOptions: {
            identity: {
                uuid,
                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`
            },
            url: this.urlToAdd
        }});

        console.log(this.selectedWindow, this.urlToAdd);
    }

    async createView() {
        const createViewPayload = {
            options: {
                defaultWidth: 700,
                defaultHeight: 900,
                name: `child-window-${Date.now()}`
            },
            layoutConfig: this.generateDefaultConfig()
        };
        try {
             await this.client.dispatch('create-view', createViewPayload);
        } catch (err) {
            console.error(err);
        }
    }

    handleInput(e) {
        this[e.target.id] = e.target.value;
        console.log(this[e.target.id]);
    }

    generateDefaultConfig() {
        const {identity: { uuid } }  = fin.Application.getCurrentSync();

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
                            identity: {
                                uuid,
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`
                            },
                            url: this.url2
                        }
                    }]
                },{
                    type: 'column',
                    content:[{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
                                uuid,
                                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`
                            },
                            url: this.url3
                        }
                    },{
                        type: 'component',
                        componentName: 'browserView',
                        componentState: {
                            identity: {
                                uuid,
                                name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`
                            },
                            url: this.url4
                        }
                    }]
                }]
            }]
        };
    }
}

customElements.define('openfin-view-form', viewForm);
