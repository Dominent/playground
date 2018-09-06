jsRequire('/barebones/client/ExceptionsManager.js');

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

                let exceptionsManager = new container.ExceptionsManager();
                let clazz = exceptionsManager.compile(container[moduleType]);

                let module = new clazz(element.dataset);

                module.init();

                element.innerHTML = module
                    .render();

                [...element.children].forEach(el => queue.push(el));
            }
        }
    }

    container.Renderer = Renderer;
})(container)