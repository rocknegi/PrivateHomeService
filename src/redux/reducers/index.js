import { combineReducers } from 'redux'
import addToCartReducer from './addToCart'
import removerFromCartReducer from './removeItem'
import addQuantityReducer from './addQuantity'
import subQuantityReducer from './subQuantity'

export default combineReducers({
    addToCart: addToCartReducer,
    removeItem: removerFromCartReducer,
    addQuantity: addQuantityReducer,
    subQuantity: subQuantityReducer

})