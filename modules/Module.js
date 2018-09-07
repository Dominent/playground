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

        onChange() {
            this.render();
        }

        onException(ex) {
            console.log(ex);
        }
    }

    container.Module = Module;
})(container);