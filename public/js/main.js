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

    win.on('close-requested', async (e) => {
        let safeDialog = document.createElement('dialog');
        if (typeof safeDialog.showModal === "function") {
            document.body.appendChild(safeDialog)
            safeDialog.innerHTML+=
            `<form method="dialog">
                <p> Are you sure you want to quit? </p>
                <menu>
                    <button value="cancel">Cancel</button>
                    <button id="confirmBtn" value="default">Confirm</button>
                </menu>
            </form>`
            safeDialog.showModal();
          } else {
            alert("The dialog API is not supported by this browser");
          }
          safeDialog.addEventListener('close', function onClose() {
            if(safeDialog.returnValue === "default") {
                win.close(true);
            }
        });
    }); 
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
