import Module from '/barebones/Module.js';
import TItems from '/templates/TItems.jshtml';

class Items extends Module {
    render(){
        return TItems([]);
    }
}

export default Items;