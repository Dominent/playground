import Module from '/barebones/Module.js';
import TJumbotron from '/templates/TJumbotron.jshtml';

class Jumbotron extends Module {
    onLearnMoreClicked(ev) {
        window.alert('Learn More clicked!');
    }

    template() { return TJumbotron; }
}

export default Jumbotron;