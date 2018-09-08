(function (container) {
    class DataBinder {
        bind(module) {
            let observableProperties = module.observables();
            if (!observableProperties)
                return module;

            let values = {};

            for (let prop of observableProperties) {
                values[prop] = module[prop];

                delete module[prop];

                Object.defineProperty(module, prop, {
                    get: () => {
                        return module[`__${prop}`];
                    },
                    set: (value) => {
                        module[`__${prop}`] = value;
                        module.onChange({ name: prop, value: value });

                        return true;
                    }
                })
            }

            for (name of Object.keys(values)) {
                module[`__${name}`] = values[name];
            }

            return module;
        }
    }

    container.DataBinder = DataBinder;
})(container)