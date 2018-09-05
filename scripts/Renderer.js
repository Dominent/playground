(function (container) {
    class Renderer {
        constructor(rootNode) {
            this._rootNode = rootNode;
        }

        init() {
            this.render(this._rootNode);
        }

        render(domNode) {
            let element = domNode.querySelector('[js-module]');
            let module = element.getAttribute('js-module');

            jsRequire(`/modules/${module}.js`);

            element.innerHTML = new container[module](element.dataset)
                .render();
        }
    }

    container.Renderer = Renderer;
})(container)