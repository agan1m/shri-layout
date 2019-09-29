import { SUCCESS, FAILURE, CHANGE } from './constants';

export default async function(action, context) {
	try {
		switch (action.type) {
			case CHANGE:
				const result = await fetch('http://example.ru');
				const dispatchAction = { type: SUCCESS, payload: result };
				context.dispatch(dispatchAction);
			default:
				break;
		}
	} catch (error) {
		const errorAction = { type: FAILURE, error };
		context.dispatch(errorAction);
	}
}
