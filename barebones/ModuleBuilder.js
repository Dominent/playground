class ModuleBuilder {
    constructor() {
        this._middleware = [];
    }

    init(rootNode) {
        this.build(null, rootNode);
    }

    registerRenderer(renderer) {
        this._renderer = renderer;

        return this;
    }

    registerDataBinder(dataBinder) {
        this._dataBinder = dataBinder;

        return this;
    }

    registerEventsManager(eventsManager) {
        this._eventsManager = eventsManager;

        return this;
    }

    regsiterModuleContainer(moduleContainer) {
        this._moduleContainer = moduleContainer;

        return this;
    }

    /**
     * Register middleware, applied when module is build.
     * @param {Function} middleware Current middleware callback, that will be registered.
     * Retuns ModuleBuilder.
     */
    use(middleware) {
        this._middleware.push(middleware);

        return this;
    }

    build(module, domNode) {
        let _module = module;

        let queue = [];
        queue.push(domNode);

        while (queue.length) {
            let current = queue.shift();

            let elements = [...current.querySelectorAll('[js-module]')]

            if(current.hasAttribute('js-module')){
                elements.push(current);
            }

            for (let element of elements) {
                let moduleType = element.getAttribute('js-module');
                let moduleProps = element.dataset;

                if (_module === null) {
                    //TODO(PPavlov): Enable Exception Logging
                    for (let middleware of this._middleware) {
                        _module = middleware(_module || this._moduleContainer[moduleType]);
                    }

                    _module = new _module(moduleProps);

                    _module.init(element);

                    _module = this._dataBinder.attach(_module);
                }

                this._renderer.render(_module);

                this._eventsManager.attach(_module);

                [...element.children]
                    .forEach(el => queue.push(el));

                _module = null;
            }
        }
    }
}

export default ModuleBuilder;