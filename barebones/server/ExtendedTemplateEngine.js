const HtmlHandler = require('./HtmlHandler.js');
const CodeHandler = require('./CodeHandler.js');
const ImportHandler = require('./ImportHandler.js');

class ExtendedTemplateEngine {
    constructor() {
    }

    compileAsync(name, content) {
        let output = [];
        let imports = [];

        let lines = content.split('\n')
            .map(x => x.trim())
            .filter(Boolean);

        let htmlHandler = new HtmlHandler();
        let codeHandler = new CodeHandler();
        let importHandler = new ImportHandler();

        htmlHandler
            .setSuccessor(codeHandler
                .setSuccessor(importHandler));

        for (let i = 0; i < lines.length; ++i) {
            let { imp, out, index } = htmlHandler.handleRequest(lines, i);

            i = index;

            output.push(out);
            imports = imports.concat(imp);
        }

        let parameters = [
            '__html'
        ]

        return `${imports.join('\n')}
        export default function ${name}(${parameters.join(', ')}) {
            ${output.join('\n')}
            return __html;
        }`;
       
    }
}

module.exports = ExtendedTemplateEngine;