(function (container) {
    const STATE_CONTAINER_CHANGE_EVENT = 'STATE_CONTAINER_CHANGE_EVENT';

    class StateContainer {
        constructor() {
            this._state = {};
            this._values = {};

            this.onStateChangeEvent = (property, value) => new CustomEvent(
                STATE_CONTAINER_CHANGE_EVENT,
                { property, value });
        }

        add(property, defaultVal) {
            Object.defineProperty(this._state, property, {
                get: () => {
                    return this._values[property]
                },
                set: (value) => {
                    this._values[property] = value

                    this.dispatchEvent(this.onStateChangeEvent(property, value));
                }
            })

            if (defaultVal) {
                this._values[property] = defaultVal;
            }
        }
    }

    container.StateContainer = StateContainer;
})