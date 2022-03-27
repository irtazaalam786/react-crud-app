import product_reducer from './products';
import permission_reducer from './permissions';
import {combineReducers} from 'redux';

// Reducer decide how our state will goto our next state
// All reducers are combined

const all_reducers = combineReducers({
    products: product_reducer,
    permissions: permission_reducer
});

export default all_reducers;