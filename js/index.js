(async () => {
    const app = await fin.Application.getCurrent()
    const mainWin = await app.getWindow();
    const win = await fin.Window.getCurrent();
    // let bounds = win.getBounds();
    const allWins = await app.getChildWindows()
    const mainWindowBounds = await mainWin.getBounds();
    const monitorInfo = await fin.System.getMonitorInfo();
    const { availableRect: primary } = monitorInfo.primaryMonitor;
    const nonPrimary = monitorInfo.nonPrimaryMonitors.map(m => { let {availableRect} = m; return availableRect })
    const monitors= [primary, ...nonPrimary]
    mainWin.addListener('focused', async () => {
        // windows left bound > monitors right bound || monitors right bound is < windows left bound
        win.once('focused', async () => {
        console.log(monitors)
        const bounds = await win.getBounds()
        
        allWins.forEach(async (win, i, wins) => {
            // console.log("primary:", primary)
            if (bounds.left < monitors[i].right) {
                console.log("Hi")
            }
            // monitor.left
                console.log("window bounds:")
                await win.getBounds().then(console.log)
            })
            // win.on('bounds-changed', async () => {
            //     await win.getBounds().then(console.log)
            // })
        })
    })
})()

//cmp (A.l, A.r, B.l, B.r) {}