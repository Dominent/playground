import TNavbar from '/templates/TNavbar.jshtml';
import Module from '/barebones/Module.js';
import { dependencyContainer } from '/barebones/DependencyContainer.js';

class Navbar extends Module {
    constructor(props) {
        super(props)

        this.title = props.title || '';
        this.email = props.email || '';

        dependencyContainer.get('stateManager')
            .subscribe('person', this.onPersonChange.bind(this))
    }

    onPersonChange(ev) {
        this.email = ev.value.email;
    }

    template() { return TNavbar; }
}

export default Navbar;