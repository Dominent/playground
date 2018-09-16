import TNavbar from '/templates/TNavbar.jshtml';
import Module from '/barebones/Module.js';
import { dependencyContainer } from '/barebones/DependencyContainer.js';

class Navbar extends Module {
    constructor(props) {
        super(props)

        this.title = props.title;
        this.person = {
            email: ''
        };

        dependencyContainer.get('stateManager')
            .subscribe('person', this.onPersonChange.bind(this))
    }

    observables() { return ['person'] }

    onPersonChange(ev) {
        this.person = ev.value;
    }

    render() {
        return TNavbar.call({
            title: this.title,
            email: this.person.email
        }, []);
    }
}

export default Navbar;