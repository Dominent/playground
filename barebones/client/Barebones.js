jsRequire('barebones/client/Renderer.js');

(function (container) {
    class Barebones {
        init() {
            new container.Renderer(document.body).init();
        }

        registerService(name, service) {
            return this;
        }
    }

    container.Barebones = Barebones;
})(container)
