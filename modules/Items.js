import Module from '/barebones/Module.js';
import TItems from '/templates/TItems.jshtml';

class Items extends Module {
    constructor(props) {
        super(props);

        this.items = [1, 2, 3];
    }

    template() { return TItems; }
}

export default Items;