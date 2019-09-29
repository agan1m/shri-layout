import _ from 'lodash';

class Store {
	constructor() {
        this._reducers = [];
        this._middlewares = [];
		this.state = {};

		this.dispatch.bind(this);
		this.notify.bind(this);
	}

	subscribe(reducer) {
		this._reducers.push(reducer);
    }
    
    bindMiddleware(middleware) {
        this._middlewares.push(middleware);
    }

	unsubscribe() {
        this._reducers = [];
        this._middlewares = [];
	}

	dispatch(action) {
		let state = {};
		this._reducers.forEach((reducer) => {
			state = {...state, ...reducer(this.state, action)};
        });

        this._middlewares.forEach(middleware => middleware(action, this));

		const diff = _.differenceBy(_.values(this.state), _.values(state));
		if (diff && diff.length) {
			this.state = state;
			this.notify();
		}
	}

	notify() {
		const event = new CustomEvent('changeStore', { detail: {} });
		document.dispatchEvent(event);
	}
}

export default Store;