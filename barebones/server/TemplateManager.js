const path = require('path');
const fs = require('fs')

const ExtendedTemplateEngine = require('./ExtendedTemplateEngine');

class TemplateManager {
    compileAsync(filename) {
        let dir = path.join(process.cwd(), 'templates', filename);

        return new Promise((resolve, reject) => {
            fs.readFile(dir, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                let name = path.basename(filename, '.jshtml');
                let content = data;

                return resolve(new ExtendedTemplateEngine().compileAsync(name, content))
            })
        })
    }
}

module.exports = TemplateManager;