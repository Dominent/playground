const fs = require('fs');
const path = require('path');

const buildTemplateWrapper = (name) => `function ${name}(${parameters}) {
    ${body}
    return __html;
}`;

class TemplateEngine {
    compile(filename) {
        let dir = path.join(__dirname, 'templates', filename);
        fs.readFile(dir, 'utf8', (err, data) => {
            let parameters = new Set();
            let templateBody = data.split('\n')
                .map(x => x.trim())
                .filter(Boolean)
                .map(x => {
                    let regExp = /{{([\w.]+)}}/ig;

                    if (regExp.test(x)) {
                        let matches;

                        regExp.lastIndex = 0;

                        while (matches = regExp.exec(x)) {
                            parameters.add(matches[1]);

                            x = x.replace(matches[0], '${' + matches[1] + '}')
                        }

                        return '__html.push(`' + x + '`);';
                    }

                    return '__html.push(`' + x + '`);';
                }).join('\n');

            let template = buildTemplateWrapper(
                path.basename(filename, '.jshtml'),
                ['__html', ...parameters].join(', '),
                templateBody)

            eval(template);
        })
    }
}

module.exports = TemplateEngine;
