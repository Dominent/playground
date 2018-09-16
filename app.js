const Server = require('./barebones/server/Server');
const Router = require('./barebones/server/Router');
const TemplateManager = require('./barebones/server/TemplateManager');

let router = new Router()
    .mapIndexRoute('/', '/public/index.html')
    
    .mapDirectoryRoute('/barebones', ['.js'])
    
    .mapDirectoryRoute('/public', ['.js', '.html'])
    .mapDirectoryRoute('/modules', ['.js'])
    .mapDirectoryRoute('/services', ['.js'])
    .mapGenericRoute('/templates/{filename}', (req, res, params) => {
        const { filename } = params.path;

        return new TemplateManager().compileAsync(filename)
            .then(template => {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(template);
            })
    })

new Server(router)
    .start(8000);