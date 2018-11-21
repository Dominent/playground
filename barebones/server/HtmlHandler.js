const Handler = require('./Handler');

class HtmlHandler extends Handler {
    handleRequest(lines, index) {
        let line = lines[index];
        let params = [];

        let regex = /{{([\s\w\(\[\]\).',\\]+)}}/ig;
        if (regex.test(line)) {
            let matches;

            regex.lastIndex = 0;

            while (matches = regex.exec(line)) {
                params.push(matches[1]);

                line = line.replace(matches[0], '${' + matches[1] + '}')
            }

            return {
                imp: [],
                out: '__html.push(`' + line + '`);',
                index: index,
                params: Array.from(new Set(params))
            }
        }

        return super.handleRequest(lines, index);
    }
}

module.exports = HtmlHandler;