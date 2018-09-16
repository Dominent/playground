import { dependencyContainer } from './DependencyContainer.js';

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
        dependencyContainer.get('moduleBuilder')
            .build(this, this.__domNode);
    }

    onException(ex) {
        console.log(ex);
    }
}

export default Module;