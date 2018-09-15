class HttpRequester {
    GET(url, headers = []) {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();

            ajax.open('GET', url);

            Object.keys(headers)
                .forEach(x => ajax.setRequestHeader(x, headers[x]));

            ajax.onload = () => resolve(ajax.response);
            ajax.onerror = () => reject(ajax.response);

            ajax.send();
        })
    }

    POST() {
        throw new Error('Not Implemented!');
    }
}

export default HttpRequester;