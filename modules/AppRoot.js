import TAppRoot from '/templates/TAppRoot.jshtml';
import Module from '/barebones/client/Module.js';
import { dependencyContainer } from '/barebones/client/DependencyContainer.js';

class AppRoot extends Module {
    constructor(props) {
        super(props);

        this.name = 'AppRoot';
    }

    render() {
        return TAppRoot([], this.name);
    }

    onButtonClick(ev) {
        dependencyContainer.get('stateManager')
            .modify('testItem', {
                name: 'Ivan',
                age: '32'
            });
    }
}

export default AppRoot;
