// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof fin !== 'undefined') {
        init();
    } else {
        document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
    }
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();
    const webWin = fin.Window.getCurrentSync().getWebWindow().window;
    function FindNext () {
        let str = document.getElementById ("findField").value;
        if (str == "") {
            alert ("Please enter some text to search!");
            return;
        }

        let supported = false;
        let found = false;
        
        if (webWin.find) {        // Firefox, Google Chrome, Safari
            supported = true;
                // if some content is selected, the start position of the search 
                // will be the end position of the selection
            found = fin.Window.getCurrentSync().getWebWindow().window.find (str);
        }
        else {
            if (document.selection && document.selection.createRange) { // Internet Explorer, Opera before version 10.5
                let textRange = document.selection.createRange ();
                if (textRange.findText) {   // Internet Explorer
                    supported = true;
                        // if some content is selected, the start position of the search 
                        // will be the position after the start position of the selection
                    if (textRange.text.length > 0) {
                        textRange.collapse (true);
                        textRange.move ("character", 1);
                    }

                    found = textRange.findText (str);
                    if (found) {
                        textRange.select ();
                    }
                }
            }
        }

        if (supported) {
            if (!found) {
                alert ("The following text was not found:\n" + str);
            }
        }
        else {
            alert ("Your browser does not support this example!");
        }
    }
    //once the DOM has loaded and the OpenFin API is ready

    async function init() {
        //get a reference to the current Application.
        const hotkey = 'CommandOrControl+F';

        await fin.GlobalHotkey.register(hotkey, console.log)

        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();
        const findText = document.querySelector("#find-text");
        findText.addEventListener('click', FindNext)
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
})