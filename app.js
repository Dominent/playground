const Server = require('./Server');
const Router = require('./Router');
const TemplateEngine = require('./TemplateEngine');

const fs = require('fs');
const path = require('path');

let router = new Router()
    .mapRoute('/', (req, res) => { })
    .mapRoute('/templates/{filename}', (req, res, params) => {
        const { filename } = params.path;

        return new TemplateEngine().compileAsync(filename)
            .then(template => {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(template);
            })
    })
    .mapRoute('/templates/{name}:name:id', (req, res, params) => {
        console.log(params);
    })
    .mapRoute('/templates/{name}/{family}', (req, res, params) => {
        console.log(params);
    })

new Server(router)
    .start(8000);