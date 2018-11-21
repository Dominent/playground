import Module from '/barebones/Module.js';
import TContacts from '/templates/TContacts.jshtml';
import { dependencyContainer } from '/barebones/DependencyContainer.js';

class Contacts extends Module {
    constructor(props) {
        super(props);

        this.email = '';
    }

    template() { return TContacts; }

    onEmailChange(ev) {
        this.email = ev.target.value;

        dependencyContainer.get('stateManager')
            .modify('person', {
                email: this.email
            })
    }
}

export default Contacts;