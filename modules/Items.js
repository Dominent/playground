import Module from '/barebones/Module.js';
import TItems from '/templates/TItems.jshtml';

class Items extends Module {
    render() {
        return TItems.call({
            items: [1, 2, 3]
        }, []);
    }
}

export default Items;