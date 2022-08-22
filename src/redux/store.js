import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import reducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))