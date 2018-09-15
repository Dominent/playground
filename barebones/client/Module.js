import { serviceContainer } from './ServiceContainer.js';

class Module {
    constructor(props) {
    }

    init(domNode) {
        this.__domNode = domNode;
    }

    render() {

    }

    destroy() {

    }

    observables() {
    }

    onChange() {
        serviceContainer.getService('moduleBuilder')
            .build(this, this.__domNode.parentElement);
    }

    onException(ex) {
        console.log(ex);
    }
}

export default Module;