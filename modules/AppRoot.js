import TAppRoot from '/templates/TAppRoot.jshtml';
import Module from '/barebones/Module.js';
import { dependencyContainer } from '/barebones/DependencyContainer.js';

class AppRoot extends Module {
    constructor(props) {
        super(props);

        this.title = 'AppRoot';
    }

    template() { return TAppRoot; }

    onButtonClick(ev) {
        dependencyContainer.get('stateManager')
            .modify('testItem', {
                title: 'Ivan',
                age: '32'
            });
    }
}

export default AppRoot;
