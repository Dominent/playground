jsRequire('/modules/Module.js');
jsRequire('/templates/TAppRoot.js');

class AppRoot extends Module {
    constructor(props) {
        this.name = 'AppRoot';
    }
    
    render() {
        return TAppRoot({}, this.name);
    }
}