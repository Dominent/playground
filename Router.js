const PATH_PATTERN = '[\\w.]+';

const buildPathToken = (param) => {
    return `<${param}></${param}>`;
}

const buildQueryToken = (param) => {
    return `[${param}][/${param}]`;
}

const replacePathToken = /<\w+><\/\w+>/gi;
const replaceQueryToken = /\[\w+\]\[\/\w+\]/gi;

const buildQueryPattern = (name) => {
    return `[?&]${name}=[\\w.]+`;
}

const clearRouteTokens = (route) => {
    return route
        .replace(replacePathToken, (val) => PATH_PATTERN)
        .replace(replaceQueryToken, (val) => buildQueryPattern(/\[(\w+)\]/gi.exec(val)[1]));
}

const buildPathParams = (params, route) => {
    let buildPathParams = {};

    Object.keys(params)
        .forEach(x => buildPathParams[x] = clearRouteTokens(route
            .replace(buildPathToken(x),
                (val) => `(${PATH_PATTERN})`)))

    return buildPathParams;
}

const buildQueryParams = (params, route) => {
    let buildQueryParams = {};

    Object.keys(params)
        .forEach(x => buildQueryParams[x] = clearRouteTokens(route
            .replace(buildQueryToken(x),
                (val) => `(${buildQueryToken(x)})`)))

    return buildQueryParams;
}

class Router {
    constructor() {
        this._routes = [];
    }

    get routes() {
        // return JSON.parse(JSON.stringify(this._routes));
        return this._routes;
    }

    mapRoute(url, callback) {
        if (typeof url !== 'string') {
            throw new Error('URL must be a string!');
        }

        if (!url.startsWith('/')) {
            throw new Error('URL must start with "/" symbol!');
        }

        if (url.length < 0) {
            throw new Error('URL cannot be empty!');
        }

        let params = {
            query: {},
            path: {}
        }

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

        params.path = buildPathParams(params.path, route);
        params.query = buildQueryParams(params.query, route);

        route = clearRouteTokens(route);

        this._routes.push({ route, url, callback, params });

        this._routes = this._routes.sort((x, y) => x.route.length < y.route.length)

        return this;
    }
}

module.exports = Router;
