jsRequire('/modules/Module.js');

(function (container) {
    class ExceptionsManager {
        compile(module) {
            module =  (function (_module) {
                this[module.name] = function () {
                    new _module(arguments);

                    const proto = Object.getPrototypeOf(this);
                    const methods = Object.getOwnPropertyNames(proto)
                        .filter(x => x !== 'constructor');

                    // Overwrite class methods
                    for (let method of methods) {
                        this[method] = function () {
                            try {
                                return _module.prototype[method]
                                    .apply(this, arguments);
                            } catch (error) {
                                this.onException(error);
                            }
                        };
                    }
                }

                // reset prototype
                this[module.name].prototype = _module.prototype; 

                // fix constructor property
                this[module.name].prototype.constructor = this[module.name]; 

                return this[module.name];
            }).call(this, module);

            return module;
        }

    }

    container.ExceptionsManager = ExceptionsManager;
})(container)