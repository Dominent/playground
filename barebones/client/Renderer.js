jsRequire('/barebones/client/ExceptionsManager.js');
jsRequire('/barebones/client/DataBinder.js');

(function (container) {
    class Renderer {
        constructor(rootNode) {
            this._rootNode = rootNode;
        }

        init() {
            this.render(this._rootNode);
        }

        render(domNode) {
            let queue = [];

            queue.push(domNode);

            while (queue.length) {
                let current = queue.shift();

                let element = current.querySelector('[js-module]');
                if (!element) { continue; }

                let moduleType = element.getAttribute('js-module');

                jsRequire(`/modules/${moduleType}.js`);

                //TODO(PPavlov): Move to first registration of module!
                let exceptionsManager = new container.ExceptionsManager();
                let safeModule = exceptionsManager.compile(container[moduleType]);

                //TODO(PPavlov): Move to first registration of module!
                let dataBinder = new container.DataBinder();
                let bindModule = dataBinder.bind(safeModule);

                let module = new bindModule(element.dataset);
                // let module = new safeModule(element.dataset);

                module.name = 'IvanPetkan';
                
                module.init();

                element.innerHTML = module
                    .render();

                debugger;
                module.name = 'IvanPetkan';

                [...element.children].forEach(el => queue.push(el));
            }
        }
    }

    container.Renderer = Renderer;
})(container)