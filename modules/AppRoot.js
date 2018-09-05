jsRequire('/modules/Module.js');
jsRequire('/templates/TAppRoot.jshtml');

(function(barebones){
    class AppRoot extends barebones.Module {
        constructor(props) {
            this.name = 'AppRoot';
        }
        
        render() {
            return TAppRoot({}, this.name);
        }
    }

    barebones.AppRoot = AppRoot;
})(barebones)
