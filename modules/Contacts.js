import Module from '/barebones/Module.js';
import TContacts from '/templates/TContacts.jshtml';

class Contacts extends Module {
    constructor(props) {
        super(props);

        this.email = '';
    }

    observables() { return ['email'] }

    onEmailChange(ev) {
        this.email = ev.target.value;
        ev.stopPropagation()
    }

    render() {
        return TContacts([], this.email);
    }
}

export default Contacts;