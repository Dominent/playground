jsRequire('/templates/TAppRoot.jshtml');

(function (container) {
    const { stateManager } = barebones;

    class AppRoot extends container.Module {
        constructor(props) {
            super(props);

            this.name = 'AppRoot';
        }

        render() {
            return TAppRoot([], this.name);
        }

        onButtonClick(ev) {
            stateManager.modify('testItem', {
                name: 'Ivan',
                age: '32'
            });
        }
    }

    container.AppRoot = AppRoot;
})(container)
