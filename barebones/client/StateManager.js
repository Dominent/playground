jsRequire('/StateContainer.js');

(function (container) {
    class StateManager {
        constructor() {
            this._subscriptions = {};

            this.stateContainer = new container
                .StateContainer();

            this.stateContainer
                .onStateChangeHandler = (ev) => {
                    this._subscriptions[ev.data].call(this, ev);

                    console.log(ev.data, ev.value);
                }
        }

        subscribe(property, subscription) {
            this._subscriptions[property] = subscription;
        }

        modify(property, value) {
            this.stateContainer[property] = value;
        }
    }

    container.StateManager = StateManager;
})(container);