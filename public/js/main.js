document.addEventListener("DOMContentLoaded", async () => {
    /**
     * @constant rootFin
     * @description top level reference to the fin object such that each child window is created from the Main Application Window.
     * @returns initial fin object
     */
    const rootFin = (function () {
        let win = window;
        while (win.opener) {
            win = win.opener;
        }
        return win.fin;
    })();

    if (typeof fin !== 'undefined') {
        init();
    } else {
        document.querySelector('#of-version').innerText = fin.System.getVersion();
    };

    async function init() {
        const app = await fin.Application.getCurrent();
        const mainWin = await app.getWindow();
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();
        
        /** 
         * create window from @rootFin
         */
        const children = []
        fin.Application.getCurrentSync().on('window-initialized', () => {
            children.push(fin.Window.getCurrentSync().me.name)
        });
        document
            .getElementById("create-child")
            .addEventListener('click', async () => {
                rootFin.Window.create({
                    name: `child-window-${Date.now()}`,
                    url: location.href
                })
            
                console.log(children)
            })

        document
            .getElementById("close-children")
            .addEventListener('click', closeChildren)


        /**
         * @async
         * @function closeChildren()
         * @description iteratively close all child windows without effecting it's parent window
         */
        let rels=[];
        async function winRelMap() {
            let winMap;
            console.log(children)
            // const children = await app.getChildWindows();
            children.forEach((child, i, childArr)=> {
                if((childArr.indexOf(child) - 1 < 0)) {
                  rels.push([childArr[0].me.name, child.me.name]);
                }
                else {
                    rels.push([childArr[childArr.indexOf(child)-1].me.name, child.me.name])

                }
                winMap = new Map(rels)
            })
            console.log("rels", rels)

            return winMap
        }
        
        console.log('map', await winRelMap())
        async function closeChildren () {
            const childWins = await app.getChildWindows();
            const current = fin.Window.getCurrentSync().identity.name;
            childWins.forEach((child) => {
                if (child.identity.name !== current) {
                    child.close(true)
                }
            })
        }

        if (mainWin.identity.name === app.identity.uuid) {
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

