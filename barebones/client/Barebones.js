import ModuleBuilder from './ModuleBuilder';
import ExceptionsManager from './ExceptionsManager';
import DataBinder from './DataBinder';
import Renderer from './Renderer';
import EventsManager from './EventsManager';
import StateManager from './StateManager';

class Barebones {
    constructor() {
        this.__services = {};
    }

    init(rootNode) {
        let moduleBuilder = new ModuleBuilder();
        let exceptionsManager = new ExceptionsManager();
        let dataBinder = new DataBinder();
        let renderer = new Renderer();
        let eventsManager = new EventsManager();
        let stateManager = new StateManager();

        barebones.stateManager = stateManager;

        moduleBuilder
            .use(x => exceptionsManager.attach(x))
            .registerRenderer(renderer)
            .registerDataBinder(dataBinder)
            .registerEventsManager(eventsManager)
            .init(rootNode)

        barebones.moduleBuilder = moduleBuilder;
    }

    registerService(name, service) {
        this.__services[name] = service;

        return this;
    }

    getService(name) {
        if (!this.__services[name]) {
            throw new Error('Service not found!')
        }

        return this.__services[name]();
    }
}

export default Barebones;
