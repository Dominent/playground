(function (container) {
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
            barebones.moduleBuilder
                .build(this, this.__domNode.parentElement);
        }

        onException(ex) {
            console.log(ex);
        }
    }

    container.Module = Module;
})(container);