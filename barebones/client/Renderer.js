/* IF DEV */
jsRequire('/barebones/client/ExceptionsManager.js');
jsRequire('/barebones/client/DataBinder.js');
/* END IF */

(function (container) {
    class Renderer {
        constructor(rootNode) {
            this._rootNode = rootNode;

            this.moduleSelector;
            this.buildModule;
        }

        init() {
            this.render(this._rootNode);
        }

        render(domNode) {
            let queue = [];

            queue.push(domNode);

            while (queue.length) {
                let current = queue.shift();

                let domModule = this.moduleSelector(current);
                if (!domModule) { continue; }

                jsRequire(`/modules/${domModule.type}.js`);

                let module = this.buildModule(container[domModule.type], domModule.props);

                module.init();

                domModule.element.innerHTML = module
                    .render();

                this.onAfterRender(domModule.element, module);

                module.__domNode = domModule.element;

                [...domModule.element.children].forEach(el => queue.push(el));
            }
        }
    }

    container.Renderer = Renderer;
})(container)