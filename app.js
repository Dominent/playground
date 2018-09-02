const Server = require('./server');

new Server()
    .registerRoute('/', (req, res) => { })
    .registerRoute('/templates/{name}', (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end;
    })
    .start(8000);