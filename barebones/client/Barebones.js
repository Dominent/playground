/* IF DEV */
jsRequire('/barebones/client/ModuleBuilder.js');
jsRequire('/barebones/client/ExceptionsManager.js');
jsRequire('/barebones/client/DataBinder.js');
jsRequire('/barebones/client/Renderer.js');
jsRequire('/barebones/client/EventsManager.js');
/* END IF */

(function (container) {
    class Barebones {
        constructor() {
            this.__services = {};
        }

        init(rootNode) {
            let moduleBuilder = new container.ModuleBuilder();
            let exceptionsManager = new container.ExceptionsManager();
            let dataBinder = new container.DataBinder();
            let renderer = new container.Renderer();
            let eventsManager = new container.EventsManager();

            moduleBuilder
                .use(x => exceptionsManager.attach(x))
                .registerRenderer(renderer)
                .registerDataBinder(dataBinder)
                .registerEventsManager(eventsManager)
                .init(rootNode)

            barebones.moduleBuilder = moduleBuilder;
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
