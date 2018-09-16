const Handler = require('./Handler');

class ImportHandler extends Handler {
    handleRequest(lines, index) {
        let regex = /{\(([\w\s'.\/]+)\)}/gi;
        let line = lines[index];
        let imp = [];

        if(regex.test(line)) {
            let matches;

            regex.lastIndex = 0;

            while (matches = regex.exec(line)) {
                imp.push(matches[1]);
            }

            return {
                imp: imp,
                out: '',
                index: index 
            }
        }

        return super.handleRequest(lines, index);
    }
}

module.exports = ImportHandler;