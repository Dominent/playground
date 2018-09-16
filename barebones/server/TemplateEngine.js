const path = require('path');
const fs = require('fs');

const templateWrapper = (name, parameters, body) => {
    return `export default function ${name}(${parameters}) {
        ${body}
        return __html;
    }`;
}

class TemplateEngine {
    compileAsync(filename) {
        let dir = path.join(process.cwd(), 'templates', filename);

        return new Promise((resolve, reject) => {
            fs.readFile(dir, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                let parameters = new Set();
                let lines = data.split('\n').map(x => x.trim()).filter(Boolean);

                let output = [];
                let imports = [];
                for (let i = 0; i < lines.length;) {
                    let line = lines[i];

                    line = this.parseHtmlExpression(line, parameters, output);
                    i = this.parseCodeExpression(line, i, output);
                    line = this.parseImportExpression(line, imports);
                }

                let templateBody = output.join('\n');

                return resolve(
                    imports.join('\n') +
                    templateWrapper(
                        path.basename(filename, '.jshtml'),
                        ['__html', ...parameters].join(', '),
                        templateBody)
                )
            })
        })
    }

    parseImportExpression(line, imports) {
        let importExpressionRegEx = /{\(([\w\s.\/;']+)\)}/ig;
        if (importExpressionRegEx.test(line)) {
            let matches;
            importExpressionRegEx.lastIndex = 0;
            while (matches = importExpressionRegEx.exec(line)) {
                line = line.replace(matches[0], matches[1]);
            }
            imports.push(line);
        }
        return line;
    }

    parseCodeExpression(line, i, output) {
        let startRegEx = /{\[/;
        let endRegEx = /\]}/;
        if (startRegEx.test(line)) {
            let code = line.replace(startRegEx, '');
            do {
                ++i;
            } while (!endRegEx.test(code));
            code = code.replace(endRegEx, '');
            output.push(code);
        }
        else {
            ++i;
            output.push('__html.push(`' + line + '`);');
        }
        return i;
    }

    parseHtmlExpression(line, parameters, output) {
        let htmlExpressionRegEx = /{{([\w.]+)}}/ig;
        if (htmlExpressionRegEx.test(line)) {
            let matches;
            htmlExpressionRegEx.lastIndex = 0;
            while (matches = htmlExpressionRegEx.exec(line)) {
                parameters.add(matches[1]);
                line = line.replace(matches[0], '${' + matches[1] + '}');
            }
            output.push('__html.push(`' + line + '`);');
        }
        return line;
    }
}

module.exports = TemplateEngine;
