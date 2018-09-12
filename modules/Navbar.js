jsRequire('/templates/TNavbar.jshtml');

(function (container) {
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

    container.Navbar = Navbar;
})(container)