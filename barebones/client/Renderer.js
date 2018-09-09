(function (container) {
    class Renderer {
        render(module) {
            let element = module.__domNode;
            
            let template = module.render();

            element.innerHTML = template.join('');
        }
    }

    container.Renderer = Renderer;
})(container)