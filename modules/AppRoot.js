jsRequire('/modules/Module.js');
jsRequire('/templates/TAppRoot.jshtml');

(function (barebones) {
    class AppRoot extends barebones.Module {
        constructor(props) {
            super(props);
            this.name = 'AppRoot';
        }

        render() {
            return TAppRoot([], this.name).join('');
        }
    }

    barebones.AppRoot = AppRoot;
})(barebones)
