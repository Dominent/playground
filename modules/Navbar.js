jsRequire('/modules/Module.js');
jsRequire('/templates/TNavbar.jshtml');

(function (container) {
    class Navbar extends container.Module {
        constructor(props) {
            super(props)

            this.info = props.info;
        }

        observables() { return ['info'] }

        render() {
            return TNavbar([], this.info).join('');
        }

        onClickHandler(ev) {
            this.info = 'Pustinqka Pesho';
        }
    }

    container.Navbar = Navbar;
})(container)