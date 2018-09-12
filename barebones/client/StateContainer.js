    class StateContainer {
        constructor() {
            this._state = {};
            this._values = {};

            this.onStateChangeHandler;
        }

        get State() {
            return JSON.parse(JSON.stringify(this._state));
        }

        modify(property, value) {
            this._state[property] = value;
        }

        add(property, defaultVal) {
            Object.defineProperty(this._state, property, {
                get: () => {
                    return this._values[property]
                },
                set: (value) => {
                    this._values[property] = value

                    this.onStateChangeHandler &&
                        this.onStateChangeHandler({
                            property, value
                        })
                }
            })
            
            if (defaultVal) {
                this._values[property] = defaultVal;
            }
        }

        get(property) {
            
        }
    }
    
export default StateContainer;