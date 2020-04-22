import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY } from "../actions/actionTypes";

const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

export const initialState = {
    items: [
        { id: 1, title: 'Brand Name', price: 110, img: image,quantity:0 },
        { id: 2, title: 'Brand Name', price: 80, img: image ,quantity:0 },
        { id: 3, title: 'Brand Name', price: 120, img: image,quantity:0  },
        { id: 4, title: 'Brand Name', price: 260, img: image ,quantity:0 },
    ],
    addedItems: [],
    total: 0

}
export default addToCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let addedItem = state.items.find(item => item.id === action.id)
            let existed_item = state.addedItems.find(item => action.id === item.id)
            if (existed_item) {
                addedItem.quantity += 1
                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            }
            else {
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price

                return {
                    ...state,
                    addedItems: [...state.addedItems, addedItem],
                    total: newTotal
                }

            }
        }
        case REMOVE_ITEM: {
            let itemToRemove = state.addedItems.find(item => action.id === item.id)
            let new_items = state.addedItems.filter(item => action.id !== item.id)

            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
            console.log(itemToRemove)
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        case ADD_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id)
            addedItem.quantity += 1
            let newTotal = state.total + addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
        case SUB_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id)
            if(addedItem.quantity === 1){
                addedItem.quantity -= 1
                let new_items = state.addedItems.filter(item => item.id !== action.id)
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    addedItems: new_items,
                    total: newTotal
                }
            }
            else {
                addedItem.quantity -= 1
                let newTotal = state.total - addedItem.price
                return {
                    ...state,
                    total: newTotal
                }
            }
        }
        default: return state

    }
}

