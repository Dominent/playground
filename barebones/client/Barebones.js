jsRequire('/barebones/client/Renderer.js');

(function (container) {
    class Barebones {
        constructor() {
            this.__services = {};
        }

        init() {
            new container.Renderer(document.body).init();
        }

        registerService(name, service) {
            this.__services[name] = service;

            return this;
        }

        getService(name) {
            if (!this.__services[name]) {
                throw new Error('Service not found!')
            }

            return this.__services[name]();
        }
    }

    container.Barebones = Barebones;
})(container)
