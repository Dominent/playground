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
        this.routes = [];

        this.onRequestCallback = this.onRequestCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
    }

    onSuccessCallback(port) {
        console.log(`Successfully connected at port: ${port}`)
    }

    //http://localhost:8000/templates/TComboBox.js?id=32
    //http://localhost:8000/templates/{name}

    //[\w.]+
    //[?&]id=[\w.]+
    //(?<=:)[\w.]+
    onRequestCallback(req, res) {
        const { url, method } = req;

        for (let item of this.routes) {
            let rexExp = new RegExp(item.route, 'gi');

            let isMatch = rexExp.test(url);
            if (isMatch) {
                return item.callback(req, res, {
                    path: [],
                    query: []
                });
            }

            console.log(item);
        }

        // Object.keys(this.routes)
        //     .


        // for (let routeName in routeNames) {
        //     let disassembledRouteName = routeName.split('/');
        //     let _t = url.split('/');

        //     for (let i = 0; i < disassembledRouteName.length; ++i) {

        //     }
        // }

        if (this.routes[url]) {
            url.split('/')

            this.routes[url](req, res, {
                params: {},
                query: {}
            });
        }
    }

    //TODO(PPavlov): Check for callback
    registerRoute(url, callback) {
        if (typeof url !== 'string') {
            throw new Error('URL must be a string!');
        }

        if (!url.startsWith('/')) {
            throw new Error('URL must start with "/" symbol!');
        }

        if (url.length < 0) {
            throw new Error('URL cannot be empty!');
        }

        let pathPattern = '[\\w.]+';
        let queryPattern = (name) => `[?&]${name}=[\\w.]+`
        let params = {
            query: {},
            path: {}
        }

        let route = url
            .replace(/:[\w.]+/gi, (val) => {
                let param = val.replace(':', '');

                params.query[param] = undefined;

                return queryPattern(param)
            })
            .replace(/{[\w.]+}/gi, (val) => {
                let param = val.replace(/{|}/gi, '');

                params.path[param] = undefined;

                return pathPattern
            });

        //Build Query and Path Regex for path use capturing groups

        this.routes.push({ route, url, callback, params });

        this.routes = this.routes.sort((x, y) => x.route.length < y.route.length)

        return this;
    }

    start(port) {
        http.createServer(this.onRequestCallback, () => this.onSuccessCallback(port))
            .listen(port);
    }
}

module.exports = Server;