/* IF DEV */
jsRequire('/barebones/client/Renderer.js');
jsRequire('/barebones/client/EventsManager.js');
/* END IF */

(function (container) {
    class Barebones {
        constructor() {
            this.__services = {};
        }

        init() {
            //TODO(PPavlov): This is shit, need to cleanup, rewrite renderer, its more bloated than a sick dog
            let renderer = new container.Renderer(document.body);

            renderer.moduleSelector = (node) => {
                let element = node.querySelector('[js-module]');

                if (element) {
                    return {
                        type: element.getAttribute('js-module'),
                        props: element.dataset,
                        element: element
                    }
                } else {
                    return null;
                }
            };

            renderer.buildModule = (moduleClass, props) => {
                //TODO(PPavlov): Move to first registration of module!
                let exceptionsManager = new container.ExceptionsManager();
                let safeModule = exceptionsManager.compile(moduleClass);

                let module = new safeModule(props);

                //TODO(PPavlov): Move to first registration of module!
                let dataBinder = new container.DataBinder();
                let bindModule = dataBinder.bind(module);

                return bindModule;
            }

            renderer.onAfterRender = (element, module) => new container.EventsManager()
                .attachEvents(element, module);

            renderer.init();

            barebones.__renderer = renderer;
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
