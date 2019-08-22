import { html, render } from '../node_modules/lit-html/lit-html.js';
import { createWindow, addViewToWindow, getViews, removeView, moveView } from './frame-api.js';

class viewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.generateDefaultConfig = this.generateDefaultConfig.bind(this);
        this.addToView = this.addToView.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.selectSource = this.selectSource.bind(this);
        this.selectDestination = this.selectDestination.bind(this);
        this.selectView = this.selectView.bind(this);
        this.moveView = this.moveView.bind(this);
        this.window = fin.Window.getCurrentSync();
        this.viewList = [];

        //this could be done better.
        fin.Application.getCurrentSync().on('window-initialized', this.render);
        fin.Application.getCurrentSync().on('window-closed', this.render);
        this.render();
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
                <select @change=${(e) => this.selectedWindow = e.srcElement.value}>
                    ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                </select>
             </fieldset>
             <fieldset>
                 <legend>Move a view</legend>
                 <button @click=${this.moveView}>Add</button> <br>
                 <label>From</label>
                 <select @change="${this.selectSource}">
                     ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                 </select>
                 <br>
                 <label>To</label>
                 <select @change="${this.selectDestination}">
                     ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                 </select>
                 <br>
                 <label>View</label>
                 <select @change="${this.selectView}">
                     ${this.viewList.map((view) => html`<option value="${JSON.stringify(view)}">${view.url}</option>`)}
                 </select>
             </fieldset>
        </div>`;
        render(vForm, this);
    }

    async moveView() {
        console.log(this.selectedView);
        console.log('here we go', { uuid: this.window.identity.uuid, name: this.destinationWindow });
        const sourceWindowIdentity = { uuid: this.window.identity.uuid, name: this.sourceWindow };
        const destinationWindowIdentity = { uuid: this.window.identity.uuid, name: this.destinationWindow };
        await moveView(this.selectedView, sourceWindowIdentity, destinationWindowIdentity);
    }

    async selectSource(e) {
        this.sourceWindow = e.target.value;
        this.viewList = await getViews({ uuid: this.window.identity.uuid, name: this.sourceWindow });
        this.render();
    }

    selectDestination(e) {
        this.destinationWindow = e.target.value;

    }

    selectView(e) {
        console.log(e.target.value);
        //TODO get rid of this hack.... please.
        this.selectedView = JSON.parse(e.target.value);
        console.log(this.selectedView);
    }

    async addToView() {
        const {identity: { uuid } }  = fin.Application.getCurrentSync();
        const target = { uuid, name: this.selectedWindow };
        addViewToWindow({
            identity: {
                uuid,
                name: `component_${Date.now() +  Math.floor(Math.random() * 10000)}`
            },
            url: this.urlToAdd
        }, target);
        console.log(this.selectedWindow, this.urlToAdd);
    }

    async createView() {
        try {
            createWindow(this.generateDefaultConfig());
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
