import Store from './Store';
import myMiddleware from './Middleware';
import { CHANGE } from './constants';
import reducer from './reducer';

class View {
	constructor(el) {
		this.store = new Store();
		this.store.subscribe(reducer);
		this.store.bindMiddleware(myMiddleware);

		this._handlerOnChange.bind(this);

		this._handlerOnChange();

        this._el = el && document.querySelector(el);
        
		document.addEventListener('changeStore', this.render.bind(this));
	}

	_handlerOnChange() {
		document
			.querySelector('.Input')
			.addEventListener('input', this._onChange.bind(this));
	}

	_onChange(e) {
		this.store.dispatch({ type: CHANGE, payload: e.target.value });
	}

	render() {
		const { data } = this.store.state;
		this._el.innerHTML = `${data}`;
	}
}

export default View;
