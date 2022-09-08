// import {legacy_createStore as createStore,applyMiddleware} from 'redux'
// import reducers from './reducers'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import thunk from 'redux-thunk'

// export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './slice/userInfoSlice'
import categorySlice from './slice/categorySlice'
import productSlice from './slice/productSlice'
export default configureStore({
    reducer: {
        userInfo: userInfoSlice,
        categoryInfo: categorySlice,
        productInfo: productSlice
    }
})