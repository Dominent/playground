import TNavbar from '/templates/TNavbar.jshtml';

const { stateManager } = barebones;

class Navbar extends container.Module {
    constructor(props) {
        super(props)

        this.info = props.info;

        stateManager.subscribe('testItem', this.onNavbarItemChange);
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