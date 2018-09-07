(function (container) {
    class DataBinder {
        bind(module) {
            return new Proxy(module, {
                get: (target, name) => {
                    debugger;
                    console.log(target, name)
                    return target[name];
                },
                set: (target, name, value) => {
                    debugger;
                    console.log(target, name, value)
                    return target[name] = value;
                }
            })
        }
    }

    container.DataBinder = DataBinder;
})(container)