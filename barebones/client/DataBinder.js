(function (container) {
    class DataBinder {
        bind(module) {
            return new Proxy(module, {
                get: (target, name) => {
                    return target[name];
                },
                set: (target, name, value) => {
                    target.onChange({ name: value });

                    return target[name] = value;
                }
            })
        }
    }

    container.DataBinder = DataBinder;
})(container)