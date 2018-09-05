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

function jsRequire(path) {
    const file = AJAX.GET(`http://localhost:8000/${path}`);

    console.log(file);
}

function BarebonesJS() {
    return {
        init: (domNode) => {
            jsRequire('modules/AppRoot.js');
        }
    }
}


