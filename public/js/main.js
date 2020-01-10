// uncomment line below to register offline cache service worker 
// navigator.serviceWorker.register('../serviceworker.js');
// import Microphone from '../../node_modules/@gkt/microphone/dist/Microphone.js';

if (typeof fin !== 'undefined') {
    init();
} else {
    document.querySelector('#of-version').innerText =
        'The fin API is not available - you are probably running in a browser.';
}

// init();
//once the DOM has loaded and the OpenFin API is ready
async function init() {
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();
    await fin.System.showDeveloperTools(app.identity);
    const ofVersion = document.querySelector('#of-version');
    ofVersion.innerText = await fin.System.getVersion();
    const audioBtn = document.querySelector('#audio-btn');
    let mic;
    audioBtn.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log(stream);
        mic = new Microphone(stream);
        console.log(mic)

        // // start recording audio from the microphone
        mic.start();


        // // periodically export a Blob containing WAV data of the audio recorded since the last export

        // // stop recording audio
        // mic.stop()

    })

    const stopBtn = document.querySelector('#stop-btn');
    stopBtn.addEventListener('click', () => {
        mic.stop();
        const blob = mic.export();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
        
        console.log(blob)
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
