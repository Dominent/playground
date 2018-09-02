const Server = require('./server');

new Server()
    .registerRoute('/', (req, res) => { })
    .registerRoute('/templates/{name}', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    })
    .registerRoute('/templates/{name}:name:id', (req, res) => {

    })
    .registerRoute('/templates/{name}/{family}', (req, res) => {
        
    })
    .start(8000);