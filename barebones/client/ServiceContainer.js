class ServiceContainer {
    constructor() {
        this.__services = {};
    }

    registerService(name, service) {
        this.__services[name] = service;

        return this;
    }

    getService(name) {
        if (!this.__services[name]) {
            throw new Error('Service not found!')
        }

        return this.__services[name];
    }
}

export let serviceContainer =  new ServiceContainer();