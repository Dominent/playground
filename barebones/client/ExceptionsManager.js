jsRequire('/modules/Module.js');

(function (container) {
    class ExceptionsManager {
        compile(module) {
            module =  (function (_module) {
                module = function () {
                    let that = new _module(...arguments);

                    const proto = Object.getPrototypeOf(that);
                    const methods = Object.getOwnPropertyNames(proto)
                        .filter(x => x !== 'constructor');

                    // Overwrite class methods
                    for (let method of methods) {
                        that[method] = function () {
                            try {
                                return _module.prototype[method]
                                    .apply(that, arguments);
                            } catch (error) {
                                that.onException(error);
                            }
                        };
                    }

                    return that;
                }

                // reset prototype
                module.prototype = _module.prototype; 

                // fix constructor property
                module.prototype.constructor = module; 

                return module;
            })(module);

            return module;
        }
    }

    container.ExceptionsManager = ExceptionsManager;
})(container)