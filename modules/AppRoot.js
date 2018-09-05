jsRequire('/modules/Module.js');
jsRequire('/templates/TAppRoot.jshtml');

(function (container) {
    class AppRoot extends container.Module {
        constructor(props) {
            super(props);
            this.name = 'AppRoot';
        }

        render() {
            return TAppRoot([], this.name).join('');
        }
    }

    container.AppRoot = AppRoot;
})(container)
