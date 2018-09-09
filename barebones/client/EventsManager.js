(function (container) {
    class EventsManager {
        attach(module) {
            let element = module.__domNode;

            let queue = [];

            queue.push(element);
            
            while (queue.length) {
                let current = queue.shift();
                let attributes = current.getAttributeNames();
                const excludedAttributes = ['js-module'];
                let regExp = new RegExp(`(?!${excludedAttributes.join('|')})js-[\\w]+`, 'i');

                let eventAttributes = attributes
                    .filter(x => regExp.test(x));

                for (let ev of eventAttributes) {
                    let handler = current.getAttribute(ev);
                    let type = ev.replace('js-', '');

                    current.addEventListener(type, module[handler]);
                }

                [...current.children].forEach(x => queue.push(x));
            }
        }
    }

    container.EventsManager = EventsManager;
})(container)