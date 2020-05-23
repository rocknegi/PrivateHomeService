import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY,ADD_ON_ADD, FETCH_DATA } from "./actionTypes"
import { getData } from '../../utils/FirestoreData'
import _ from "lodash";

const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

const items2 = [
    { id: 'option1', title: 'seesha 1', price: 52, img: image, quantity: 0, category: 'seesha' },
    { id: 'option2', title: 'seesha 2', price: 10, img: image, quantity: 0, category: 'seesha' },
    { id: 'option3', title: 'seesha 3', price: 12, img: image, quantity: 0, category: 'seesha' },
    { id: 'option4', title: 'seesha 4', price: 20, img: image, quantity: 0, category: 'seesha' },
]

const items3 = [
    { id: 'paid1', title: 'Time', price: 5, quantity: 1, category: 'games' },
]

export const fetchData = category => async (dispatch) => _fetch(category, dispatch);
const _fetch = _.memoize(async (category, dispatch) => {
    const items = await getData('');
    console.log(items)
    if (category === '') {
        dispatch({
            type: FETCH_DATA,
            payload: {
                items,
                category
            }

        })
    }
    else if (category === 'games') {
        return {
            type: FETCH_DATA,
            payload: {
                items: items3,
                category
            }
        }
    }
    else return {
        type: FETCH_DATA,
        payload: {
            items: items2,
            category
        }
    }
})

export const addToCart = (item, category) => {
    return {
        type: ADD_TO_CART,
        item,
        category
    }
}

export const removeFromCart = (id) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}

export const addQuantity = (id) => {
    return {
        type: ADD_QUANTITY,
        id,
    }
}

export const subQuantity = (id, category) => {
    return {
        type: SUB_QUANTITY,
        id,
        category
    }
}

export const addOnAdd = (item, option) => {
    return {
        type: ADD_ON_ADD,
        item,
        option
    }
}

