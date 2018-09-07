jsRequire('/modules/Module.js');
jsRequire('/templates/TNavbar.jshtml');

(function (container) {
    class Navbar extends container.Module {
        constructor(props) {
            super(props)

            this.info = props.info;
        }

        render() {
            return TNavbar([], this.info).join('');
        }

        onClickHandler(ev) {
            debugger;
            console.log(ev);
        }
    }

    container.Navbar = Navbar;
})(container)