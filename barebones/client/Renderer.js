class Renderer {
    render(module) {
        let element = module.__domNode;

        let template = module.render();

        element.innerHTML = template.join('');
    }
}

export default Renderer;