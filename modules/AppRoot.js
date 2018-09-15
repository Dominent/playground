import TAppRoot from '/templates/TAppRoot.jshtml';
import Module from '/barebones/client/Module.js';
import { serviceContainer } from '/barebones/client/ServiceContainer.js';

class AppRoot extends Module {
    constructor(props) {
        super(props);

        this.name = 'AppRoot';
    }

    render() {
        return TAppRoot([], this.name);
    }

    onButtonClick(ev) {
        serviceContainer.getService('stateManager')
            .modify('testItem', {
                name: 'Ivan',
                age: '32'
            });
    }
}

export default AppRoot;
