//TODO(PPavlov): Add Check if applied to typeof module
//TODO(PPavlov): Exclude compile for [Module.js]

(function (container) {
    class ExceptionsManager {
        attach(module) {
            module = (function (_module) {
                module = function () {
                    if (!_module.prototype instanceof container.Module) {
                        return module;
                    }

                    let that = new _module(...arguments);

                    let proto = Object.getPrototypeOf(that);
                    const methods = Object.getOwnPropertyNames(proto)
                        .filter(x => x !== 'constructor');

                    // Overwrite class methods
                    for (let method of methods) {
                        // This is very suspicous, we should edit the proto not the object
                        // Replace with Object.defineproperty
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