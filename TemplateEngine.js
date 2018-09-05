const path = require('path');

const promiseWrappers = require('./promiseWrappers');

const templateWrapper = (name, parameters, body) => {
    return `function ${name}(${parameters}) {
        ${body}
        return __html;
    }`;
}

class TemplateEngine {
    compileAsync(filename) {
        let dir = path.join(__dirname, 'templates', filename);

        return promiseWrappers.readFile(dir)
            .then(data => {
                let parameters = new Set();
                let templateBody = data.split('\n').map(x => x.trim()).filter(Boolean)
                    .map(x => {
                        let regex = /{{([\w.]+)}}/ig;

                        if (regex.test(x)) {
                            let matches;

                            regex.lastIndex = 0;

                            while (matches = regex.exec(x)) {
                                parameters.add(matches[1]);

                                x = x.replace(matches[0], '${' + matches[1] + '}')
                            }

                            return '__html.push(`' + x + '`);';
                        }

                        return '__html.push(`' + x + '`);';
                    }).join('\n');

                return templateWrapper(
                    path.basename(filename, '.jshtml'),
                    ['__html', ...parameters].join(', '),
                    templateBody)
            })
    }
}

module.exports = TemplateEngine;
