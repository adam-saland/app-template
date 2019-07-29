const openfinLauncher = require('hadouken-js-adapter');
const express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 8081;

const configs = ['./dist/app.json'];

const app = express();
app.use(express.static('./dist'));

http.createServer(app).listen(port, async function(){
    console.log(`Express server listening on port ${port}`);
    for (let i=0; i<configs.length; i++) {
        const c = configs[i];
        const confPath  = path.resolve(c);
        openfinLauncher.launch({ manifestUrl: confPath})
            .then(() => console.log(`app: ${c} started`))
            .catch(err => console.error(`error running app: ${c}`, err));
    }
});