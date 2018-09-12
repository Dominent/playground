jsRequire('/barebones/client/StateContainer.js');

(function (container) {
    class StateManager {
        constructor() {
            this._subscriptions = {};

            this.stateContainer = new container
                .StateContainer();

            this.stateContainer.onStateChangeHandler = function (ev) {
                this._subscriptions[ev.property](ev)
            }.bind(this);
        }

        subscribe(property, subscription, defaultValue = undefined) {
            this._subscriptions[property] = subscription;

            this.stateContainer.add(property, defaultValue);

            return this;
        }

        modify(property, value) {
            this.stateContainer.modify(property, value);

            return this;
        }
    }

    container.StateManager = StateManager;
})(container);