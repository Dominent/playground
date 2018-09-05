jsRequire('TAppRoot');

class AppRoot extends Module {
    constructor(props) {
        this.name = 'AppRoot';
    }
    
    render() {
        return TAppRoot({}, this.name);
    }
}