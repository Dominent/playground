this.container = {
};

this.__required = [];

function jsInclude(path) {
}

function jsRequire(path) {
    if (this.__required.includes(path)) {
        return;
    }

    this.__required.push(path);

    var request = new XMLHttpRequest();

    const isAsyncRequest = false;

    request.open('GET', `http://localhost:8000/${path}`, isAsyncRequest);
    request.send(null);

    const response = request.response;

    eval.call(this, response);
}

const AJAX = {
    GET: function (url, headers = []) {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();

            ajax.open('GET', url);

            Object.keys(headers)
                .forEach(x => ajax.setRequestHeader(x, headers[x]));

            ajax.onload = () => resolve(ajax.response);
            ajax.onerror = () => reject(ajax.response);

            ajax.send();
        })
    },
    POST: function () {
    }
}