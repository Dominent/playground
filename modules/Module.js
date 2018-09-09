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
            console.log('change occured');
            // barebones.__render
            // .render(this.render());
        }

        onException(ex) {
            console.log(ex);
        }
    }

    container.Module = Module;
})(container);