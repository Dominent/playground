const Handler = require('./Handler');

class HtmlHandler extends Handler {
    handleRequest(lines, index) {
        let line = lines[index];

        let regex = /{{([\s\w\(\[\]\).',\\]+)}}/ig;
        if (regex.test(line)) {
            let matches;

            regex.lastIndex = 0;

            while (matches = regex.exec(line)) {
                line = line.replace(matches[0], '${' + matches[1] + '}')
            }

            return {
                imp: [],
                out: '__html.push(`' + line + '`);',
                index: index
            }
        }

        return super.handleRequest(lines, index);
    }
}

module.exports = HtmlHandler;