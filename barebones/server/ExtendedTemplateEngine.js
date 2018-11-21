const HtmlHandler = require('./HtmlHandler.js');
const CodeHandler = require('./CodeHandler.js');
const ImportHandler = require('./ImportHandler.js');

class ExtendedTemplateEngine {
    compileAsync(name, content) {
        let output = [];
        let imports = [];

        let lines = content.split('\n')
            .map(x => x.trim())
            .filter(Boolean);

        let htmlHandler = new HtmlHandler();
        let codeHandler = new CodeHandler();
        let importHandler = new ImportHandler();

        let parameters = [
            '__html'
        ]

        htmlHandler
            .setSuccessor(codeHandler
                .setSuccessor(importHandler));

        for (let i = 0; i < lines.length; ++i) {
            let { imp, out, index, params } = htmlHandler.handleRequest(lines, i);

            i = index;

            output.push(out);

            imports = imports.concat(imp);

            parameters.push(...params);
        }

        return `${imports.join('\n')}
        export default function ${name}(${[...Array.from(new Set(parameters))].join(', ')}) {
            ${output.join('\n')}
            return __html;
        }`;
    }
}

module.exports = ExtendedTemplateEngine;