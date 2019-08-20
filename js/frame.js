import { html, render } from '../node_modules/lit-html/lit-html.js';
import { closeIcon, minimizeIcon, maximizeIcon } from './constants.js';

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
