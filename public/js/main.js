// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');

if (typeof fin !== 'undefined') {
    init();
} else {
    document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
}
//once the DOM has loaded and the OpenFin API is ready
async function init() {
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();

    const ofVersion = document.querySelector('#of-version');
    ofVersion.innerText = await fin.System.getVersion();

    function closePrompt() {
        let closePromptEl = document.createElement('div');
        let closePromptMsg = document.createElement('p');
        let btnWrapper = document.createElement('div');
        let okBtn = document.createElement('button');
        let cancelBtn = document.createElement('button');

        closePromptEl.setAttribute('id', 'close-prompt');
        btnWrapper.setAttribute('id', 'button-wrapper');
        okBtn.setAttribute('id', 'ok');
        cancelBtn.setAttribute('id', 'cancel');

        closePromptMsg.innerText = 'Are you sure you want to exit?';
        okBtn.innerText = 'OK';
        cancelBtn.innerText = 'Cancel';

        btnWrapper.append(okBtn);
        btnWrapper.append(cancelBtn);
        closePromptEl.append(closePromptMsg);
        closePromptEl.append(btnWrapper);

        document.querySelector('body').append(closePromptEl);

        return closePromptEl;
    }

    win.addListener('close-requested', () => {
        let closePromptEl = closePrompt();

        closePromptEl.addEventListener('click', event => {
            if (event.target.id === 'ok') win.close(true);
            if (event.target.id === 'cancel') document.querySelector('body').removeChild(closePromptEl);
        })
    })
}


