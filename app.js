const Server = require('./Server');
const Router = require('./Router');

const fs = require('fs');
const path = require('path');

let router = new Router()
    .mapRoute('/', (req, res) => { })
    .mapRoute('/templates/{name}', (req, res, params) => {
        let location = path.join(__dirname, 'templates', params.path.name);
        fs.readFile(location, 'utf8', (err, data) => {
            console.log(data);
        });

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    })
    .mapRoute('/templates/{name}:name:id', (req, res, params) => {
        console.log(params);
    })
    .mapRoute('/templates/{name}/{family}', (req, res, params) => {
        console.log(params);
    })

new Server(router)
    .start(8000);

// registerModule(AppRootModule, 'TAppRootModule')
// registerService()