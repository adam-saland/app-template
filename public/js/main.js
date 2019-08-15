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
    //once the DOM has loaded and the OpenFin API is ready
    window.addEventListener('keyup', (e) => {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            console.log(document.getElementById('f1').getAttribute('visibility'));
             
        }
    });
    function findString(str) {
        if (parseInt(navigator.appVersion) < 4) return;
        let strFound;
        if (window.find) {
            // CODE FOR BROWSERS THAT SUPPORT window.find
            strFound = self.find(str);
            if (strFound && self.getSelection && !self.getSelection().anchorNode) {
                strFound = self.find(str)
            }
            if (!strFound) {
                strFound = self.find(str, 0, 1)
                while (self.find(str, 0, 1)) continue
            }
        } else if (navigator.appName.indexOf("Microsoft") != -1) {
            // EXPLORER-SPECIFIC CODE        
            if (TRange != null) {
                TRange.collapse(false)
                strFound = TRange.findText(str)
                if (strFound) TRange.select()
            }
            if (TRange == null || strFound == 0) {
                TRange = self.document.body.createTextRange()
                strFound = TRange.findText(str)
                if (strFound) TRange.select()
            }
        } else if (navigator.appName == "Opera") {
            alert("Opera browsers not supported, sorry...")
            return;
        }
        if (!strFound) alert("String '" + str + "' not found!")
        return;
    };
    async function init() {
        //get a reference to the current Application.

        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();
        document.getElementById('f1').onsubmit = function () {
            findString(this.t1.value);
            return false;
        };

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