class Handler {
    constructor() {
        this._successor = null;
    }

    setSuccessor(handler) {
        if (!handler instanceof Handler) {
            throw new Error('object is not of type Handler');
        }

        this._successor = handler;

        return this;
    }

    handleRequest(lines, index) {
        if(!this._successor) {
            return {
                imp: [],
                out: '__html.push(`' + lines[index] + '`);',
                index: index
            }
        }

        return this._successor.handleRequest(lines, index);
    }
}

module.exports = Handler;