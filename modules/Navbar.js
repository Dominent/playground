import TNavbar from '/templates/TNavbar.jshtml';
import Module from '/barebones/client/Module.js';
import { dependencyContainer } from '/barebones/client/DependencyContainer.js';

class Navbar extends Module {
    constructor(props) {
        super(props)

        this.info = props.info;

        dependencyContainer.get('stateManager')
            .subscribe('testItem', this.onNavbarItemChange);
    }

    observables() { return ['info'] }

    render() {
        return TNavbar([], this.info);
    }

    onNavbarItemChange(ev) {
        console.log(ev);
    }

    onClickHandler(ev) {
        this.info = 'Pustinqka Pesho';
    }
}

export default Navbar;