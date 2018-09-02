const http = require('http');

class Server {
    constructor() {
        this.routes = [];

        this.onRequestCallback = this.onRequestCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
    }

    onSuccessCallback(port) {
        console.log(`Successfully connected at port: ${port}`)
    }

    onRequestCallback(req, res) {
        const { url, method } = req;

        const getPathParams = (params, url) => {
            let pathParams = {};
            Object.keys(params).forEach(x => {
                let regExp = new RegExp(params[x], 'gi');

                let value = regExp.exec(url)[1];

                pathParams[x] = value
            })
            return pathParams;
        };

        const getQueryParams = (params, url) => {
            let queryParams = {};
            Object.keys(params).map(x => {
                let regExp = new RegExp(params[x], 'gi');

                let value = regExp.exec(url)[1];

                queryParams[x] = /\w+$/gi.exec(value)[0];
            })
            return queryParams;
        };

        for (let item of this.routes) {
            let rexExp = new RegExp(item.route, 'gi');

            let isMatch = rexExp.test(url);
            if (isMatch) {
                return item.callback(req, res, {
                    path: getPathParams(item.params.path, url),
                    query: getQueryParams(item.params.query, url),
                });
            }
        }

        res.write(404);
        res.end();
    }

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
        let buildQueryPattern = (name) => `[?&]${name}=[\\w.]+`
        let params = {
            query: {},
            path: {}
        }

        const buildPathToken = (param) => `<${param}></${param}>`;
        const buildQueryToken = (param) => `[${param}][/${param}]`;

        const replacePathToken = /<\w+><\/\w+>/gi;
        const replaceQueryToken = /\[\w+\]\[\/\w+\]/gi;

        const clearRouteTokens = (route) => route
            .replace(replacePathToken, (val) => pathPattern)
            .replace(replaceQueryToken, (val) => buildQueryPattern(/\[(\w+)\]/gi.exec(val)[1]));

        let route = url
            .replace(/:[\w.]+/gi, (val) => {
                let param = val.replace(':', '');

                params.query[param] = undefined;

                return buildQueryToken(param);
            })
            .replace(/{[\w.]+}/gi, (val) => {
                let param = val.replace(/{|}/gi, '');

                params.path[param] = undefined;

                return buildPathToken(param);
            });

        Object.keys(params.path)
            .forEach(x => params.path[x] = clearRouteTokens(route
                .replace(buildPathToken(x),
                    (val) => `(${pathPattern})`)))

        Object.keys(params.query)
            .forEach(x => params.query[x] = clearRouteTokens(route
                .replace(buildQueryToken(x),
                    (val) => `(${buildQueryToken(x)})`)))

        route = clearRouteTokens(route);

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