const Server = require('./Server');
const Router = require('./Router');
const TemplateEngine = require('./TemplateEngine');

const promiseWrappers = require('./promiseWrappers');

const path = require('path');

const fileRoute = (req, res, directory) => {
    return promiseWrappers.readFile(directory)
        .then(m => {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(m);
        })
        .catch(err => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err);
        })
}

/**
 * Route syntax:
 *     /templates/{name}:id'
 *     { path-param }
 *     : query-param
 */
let router = new Router()
    .mapRoute('/', (req, res) => {
        let directory = path.join(__dirname, 'public', 'index.html');

        promiseWrappers.readFile(directory)
            .then(m => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(m);
            })
    })
    .mapRoute('/templates/{filename}', (req, res, params) => {
        const { filename } = params.path;

        return new TemplateEngine().compileAsync(filename)
            .then(template => {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(template);
            })
    })
    .mapRoute('/modules/{filename}', (req, res, params) => fileRoute(
        req, res, path.join(__dirname, 'modules', params.path.filename)))
    .mapRoute('/scripts/{filename}', (req, res, params) => fileRoute(
        req, res, path.join(__dirname, 'scripts', params.path.filename)))
    .mapRoute('/public/{filename}', (req, res, params) => fileRoute(
        req, res, path.join(__dirname, 'public', params.path.filename)))

new Server(router)
    .start(8000);