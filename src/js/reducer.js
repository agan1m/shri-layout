import { CHANGE, SUCCESS, FAILURE } from './constants';

function reducer(state = {}, action) {
	switch (action.type) {
		case CHANGE:
			return { ...state, value: action.payload };
		case SUCCESS:
			return { ...state, data: { ...action.payload } };
		case FAILURE:
			return { ...state, error: action.error };
		default:
			return state;
	}
}

export default reducer;
