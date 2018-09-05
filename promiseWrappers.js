const fs = require('fs');

module.exports.readFile = (directory) => {
    return new Promise((resolve, reject) => fs.readFile(directory, 'utf8',
        (err, data) => {
            if (err) {
                return reject(err);
            }

            return resolve(data);
        }));
}