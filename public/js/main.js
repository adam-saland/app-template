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
        init(rootFin);
    } else {
        document.querySelector('#of-version').innerText = fin.System.getVersion();
    };

    async function init({ rootFin }) {
        const app = await fin.Application.getCurrent();
        const mainWin = await app.getWindow();
        const ofVersion = document.querySelector('#of-version');
        ofVersion.innerText = await fin.System.getVersion();

        /** 
         * create window from @rootFin
         */
        document
            .getElementById("create-child")
            .addEventListener('click', async () => {
                rootFin.Window.create({
                    name: `child-window-${Date.now()}`,
                    url: location.href
                })
            })

        document
            .getElementById("close-children")
            .addEventListener('click', closeChildren)


        /**
         * @async
         * @function closeChildren()
         * @description iteratively close all child windows without effecting it's parent window
         */
        async function closeChildren () {
            const children = await app.getChildWindows();
            const current = fin.Window.getCurrentSync().identity.name;
            children.forEach((child) => {
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

