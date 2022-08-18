import {combineReducers} from 'redux'
import login from './login'
import product from './product'
import category from './category'

export default combineReducers({
    userInfo:login,
    productInfo:product,
    categoryInfo:category
})