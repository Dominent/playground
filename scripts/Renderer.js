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

                let module = element.getAttribute('js-module');

                jsRequire(`/modules/${module}.js`);

                element.innerHTML = new container[module](element.dataset)
                    .render();

                [...element.children].forEach(el => queue.push(el));
            }
        }
    }

    container.Renderer = Renderer;
})(container)