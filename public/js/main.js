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

    const downloadBtn = document.querySelector('#create-win-btn');
    downloadBtn.addEventListener('click', async () => {
        const winV1 = await new fin.desktop.Window({
            uuid: app.me.uuid,
            name: "child-win-n",
            autoShow: true,
            hideOnClose: false,
            url: "http://localhost:5555/download.html"
        },
            (res) => { console.log(res) },
            (e) => {
                console.error(e);
                winV1.bringToFront()
                winV1.show()
            }
        )
    })
    const ofVersion = document.querySelector('#of-version');
    ofVersion.innerText = await fin.System.getVersion();

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
