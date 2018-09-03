const http = require('http');

class Server {
    constructor(router) {
        this._router = router;

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

        let routes = this._router.routes;
        for (let item of routes) {
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

    start(port) {
        http.createServer(this.onRequestCallback, () => this.onSuccessCallback(port))
            .listen(port);
    }
}

module.exports = Server;