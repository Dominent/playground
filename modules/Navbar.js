import TNavbar from '/templates/TNavbar.jshtml';
import Module from '/barebones/Module.js';

class Navbar extends Module {
    constructor(props) {
        super(props)

        this.title = props.title;
    }

    render() {
        return TNavbar([], this.title);
    }
}

export default Navbar;