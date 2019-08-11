// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');
document.addEventListener("DOMContentLoaded", async () => {
    const app = await fin.Application.getCurrent();
    const mainWin = await app.getWindow();
    const rootFin = (function () { 
        let win = window; 
        while (win.opener) { 
            win = win.opener; 
        } 
        return win.fin
    })();

    // const {opener} = mainWin.getWebWindow();
    if (typeof fin !== 'undefined') {
        init();
    } else {
        document.querySelector('#of-version').innerText = fin.System.getVersion();
    }
    
    //once the DOM has loaded and the OpenFin API is ready
    async function init() {
        const {me: {uuid} } = app;
        //get a reference to the current Application.
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();
        document
        .getElementById("create-child")
        .addEventListener('click', async () => {
            // console.log("Current Window:", me.name)
            // console.log("Opener", opener)
            rootFin.Window.create({
                name: `child-window-${Date.now()}`,
                url: location.href
            })
        })

        // fin.System.showDeveloperTools(fin.Window.getCurrentSync().me)
        //Only launch new windows from the main window.
        if (mainWin.identity.name === app.identity.uuid) {
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
})

