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


    win.on('close-requested', async () => {
        let btnHtmlStr = `
            <div id="yesNo">
            <h1> Are you sure you want to exit? </h1>
            <span>
                <button id="yes">Yes</button>
            </span>
            <span>
                <button id="no">No</button>
            </span>
            </div>`
        document.body.innerHTML += btnHtmlStr
        document
            .getElementById("yesNo")
            .addEventListener('click', (e) => {
                if (e.target.id === "yes") win.close(true);
            })

    })



    //Only launch new windows from the main window.
    if (win.identity.name === app.identity.uuid) {
        //subscribing to the run-requested events will allow us to react to secondary launches, clicking on the icon once the Application is running for example.
        //for this app we will  launch a child window the first the user clicks on the desktop.
        app.once('run-requested', async () => {
            await fin.Window.create({
                name: 'childWindow',
                url: location.href,
                defaultWidth: 320,
                defaultHeight: 320,
                autoShow: true
            });
        });
    }
}




async function launchWindow() {
    const popup = await fin.Window.create({
        uuid: fin.Window.me.uuid,
        name: `pop-up`,
        url: `${location.origin}/popup.html`,
        autoShow: true,
        defaultCentered: true
    })
    return popup
}
