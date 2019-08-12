// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');
document.addEventListener("DOMContentLoaded", async () => {

    const rootFin = (function () {
        let win = window;
        while (win.opener) {
            win = win.opener;
        }
        let rootFin = win.fin;
        return { rootFin, win }
    })();

    if (typeof fin !== 'undefined') {
        init(rootFin);
    } else {
        document.querySelector('#of-version').innerText = fin.System.getVersion();
    };


    // let makeProvider;
    //once the DOM has loaded and the OpenFin API is ready
    async function init({ rootFin, win }) {

        const app = await fin.Application.getCurrent();
        const mainWin = await app.getWindow();
        const { me: { uuid } } = app;
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();
        const closeChildren = async () => {
            const children = await app.getChildWindows();
            const current = fin.Window.getCurrentSync().identity.name;
            // const targetWindow = children.find(child => child.identity.name === current)
            // targetWindows.forEach(w => { w.close(true)}) 
            children.forEach((child) => {
                if (child.identity.name !== current) {
                    child.close(true)
                }
            })
            console.log("tgt:", current)
        }

        //get a reference to the current Application.
        document
            .getElementById("create-child")
            .addEventListener('click', async () => {
                // console.log("Current Window:", me.name)
                // console.log("Opener", opener)
                console.log(rootFin)
                rootFin.Window.create({
                    name: `child-window-${Date.now()}`,
                    url: location.href
                })
            })
        document
            .getElementById("close-children")
            .addEventListener('click', closeChildren)

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

