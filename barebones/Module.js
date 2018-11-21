import { dependencyContainer } from './DependencyContainer.js';
import { Reflection } from './Reflection.js';

class Module {
    constructor(props) {
    }

    init(domNode) {
        this.__domNode = domNode;
    }

    render() {
        this.onRender();

        let parameters = Reflection.getFuncParams(this.template());

        let materializedParameters = this.observables()
            .map(p => this[p]);

        return this.template()
            .call(this, ...[this['__html'] || [], ...materializedParameters]);
    }

    onRender() { }
    onInit() { }
    onDestroy() { }
    onStateChange() { }

    template() {
        throw new Error("Template Method Not Implemented!");
    }

    destroy() {
        this.onDestroy();
    }

    observables() {
        return Reflection.getFuncParams(this.template())
            .filter(p => p !== '__html');
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