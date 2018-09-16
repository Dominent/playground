const Handler = require('./Handler');

class CodeHandler extends Handler {
    handleRequest(lines, index) {
        let line = lines[index];

        let regex = {
            start: /{\[/ig,
            end: /\]}/ig
        }

        if (regex.start.test(line)) {
            // Here we have 2 options {[this is some code]}
            /* Second option {[
                Test
            ]}
            */
            let funcBody = [];
            do {
                funcBody.push(line);

                line = lines[++index];
            }
            while (!regex.end.test(line))

            return {
                imp: [],
                out: funcBody.join('\n')
                    .replace(regex.start, '')
                    .replace(regex.end, ''),
                index: index
            }
        }

        return super.handleRequest(lines, index);
    }
}

module.exports = CodeHandler;