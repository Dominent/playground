(function (container) {
    class Module {
        constructor(props) {

        }

        init() {

        }

        render() {

        }

        destroy() {

        }
        
        observables() {
        }

        onChange() {
            debugger;
            this.render();
        }

        onException(ex) {
            console.log(ex);
        }
    }

    container.Module = Module;
})(container);