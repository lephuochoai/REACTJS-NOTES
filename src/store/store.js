import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducers } from './reducers/authReducers';
import { noteReducers } from './reducers/noteReducers';
// import { localstorageReducers } from './reducers/localstorageReducers'

import thunk from 'redux-thunk'

const configStore = () => {
    return createStore( 
        combineReducers({ 
            authReducers,
            noteReducers,
            // localstorageReducers
        }),applyMiddleware(thunk) )
}

export { configStore }
