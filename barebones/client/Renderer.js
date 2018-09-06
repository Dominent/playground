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

                let module = new container[moduleType](element.dataset);

                console.log(module)

                module.init();

                element.innerHTML = module
                    .render();

                [...element.children].forEach(el => queue.push(el));
            }
        }
    }

    container.Renderer = Renderer;
})(container)