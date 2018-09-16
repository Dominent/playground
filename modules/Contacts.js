import Module from '/barebones/Module.js';
import TContacts from '/templates/TContacts.jshtml';
import { dependencyContainer } from '/barebones/DependencyContainer.js';

class Contacts extends Module {
    constructor(props) {
        super(props);

        this.email = '';
    }

    observables() { return ['email'] }

    onEmailChange(ev) {
        this.email = ev.target.value;

        dependencyContainer.get('stateManager')
            .modify('person', {
                email: this.email
            })
    }

    render() {
        return TContacts([], this.email);
    }
}

export default Contacts;