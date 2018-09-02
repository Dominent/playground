const http = require('http');

const onSuccessCallback = () => {
    console.log(`Successfully connected at port: ${PORT}`)
};

const onRequestCallback = (req, res) => {
    const { url, method } = req;

    this.routes[url]
};

class Server {
    constructor() {
        this.routes = {};

        this.onRequestCallback = this.onRequestCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
    }

    onSuccessCallback(port) {
        console.log(`Successfully connected at port: ${port}`)
    }

    //http://localhost:8000/templates/TComboBox.js?id=32
    //http://localhost:8000/templates/{name}

    //[\w.]+
    onRequestCallback(req, res) {
        const { url, method } = req;

        let routeNames = Object.keys(this.routes);

        for (let routeName in routeNames) {
            let disassembledRouteName = routeName.split('/');
            let _t = url.split('/');

            for (let i = 0; i < disassembledRouteName.length; ++i) {

            }
        }

        if (this.routes[url]) {
            url.split('/')


            this.routes[url](req, res, {
                params: {},
                query: {}
            });
        }
    }

    //TODO(PPavlov): Check for callback
    registerRoute(route, callback) {
        if (typeof route !== 'string') {
            throw new Error('Route must be a string!');
        }

        if (!route.startsWith('/')) {
            throw new Error('Route must start with "/" symbol!');
        }

        if (route.length < 0) {
            throw new Error('Route cannot be empty!');
        }

        let pattern = '[\w.]+';

        let pathParamRegExp = new RegExp(`{${pattern}}`, 'g');

        let queryParamRegExp = new RegExp(pattern, 'g');

        this.routes[route] = {
            pattern: route.replace(pathParamRegExp),
            callback: callback
        };

        return this;
    }

    start(port) {
        http.createServer(this.onRequestCallback, () => this.onSuccessCallback(port))
            .listen(port);
    }
}

module.exports = Server;