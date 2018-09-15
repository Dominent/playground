class DependencyContainer {
    constructor() {
        this.__container = {};
    }

    register(name, value) {
        this.__container[name] = value;

        return this;
    }

    get(name) {
        if (!this.__container[name]) {
            throw new Error(`${name} not found!`)
        }

        return this.__container[name];
    }
}

export let dependencyContainer =  new DependencyContainer();