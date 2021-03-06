import ModuleBuilder from './ModuleBuilder.js';
import ExceptionsManager from './ExceptionsManager.js';
import DataBinder from './DataBinder.js';
import Renderer from './Renderer.js';
import EventsManager from './EventsManager.js';
import StateManager from './StateManager.js';
import { dependencyContainer } from './DependencyContainer.js';

class Barebones {
    init(rootNode, moduleContainer) {
        let moduleBuilder = new ModuleBuilder();
        let exceptionsManager = new ExceptionsManager();
        let dataBinder = new DataBinder();
        let renderer = new Renderer();
        let eventsManager = new EventsManager();
        let stateManager = new StateManager();

        dependencyContainer
            .register('stateManager', stateManager)
            .register('moduleBuilder', moduleBuilder);

        moduleBuilder
            .use(x => exceptionsManager.attach(x))
            .regsiterModuleContainer(moduleContainer)
            .registerRenderer(renderer)
            .registerDataBinder(dataBinder)
            .registerEventsManager(eventsManager)
            .init(rootNode);
    }
}

export default Barebones;
