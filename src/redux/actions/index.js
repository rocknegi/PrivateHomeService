import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, SUB_OPTION, ADD_OPTION, ADD_ON_ADD, FETCH_DATA } from "./actionTypes"


const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

const items = [
    {
        id: '1liquors', title: 'Brand Name', price: 110, img: image,category:'liquors'

    },
    {
        id: '1Whiskey12', title: 'Brand Name', price: 80, img: image,category:'Whiskey12'

    },
    { id: '1Whiskey19', title: 'Brand Name', price: 120, img: image, category:'Whiskey19' },
    { id: '1Whiskey18', title: 'Brand Name', price: 260, img: image, category:'Whiskey18'},
]

const items2 = [
    {
        id: 1, title: 'Seesha', price: 110, img: image,

    },
    {
        id: 2, title: 'Brand Name', price: 80, img: image,

    },
    { id: 3, title: 'Brand Name', price: 120, img: image, quantity: 0 },
    { id: 4, title: 'Brand Name', price: 260, img: image, quantity: 0 },
]

export const fetchData = (category) => {
    if (category !== 'seesha') {
        return {
            type: FETCH_DATA,
            payload: {
                items,
                category
            }

        }
    }
    else return {
        type: FETCH_DATA,
        payload: {
            items:items2,
            category
        }
    }
}

export const addToCart = (item,category) => {
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
        id
    }
}

export const subQuantity = (id) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

export const addOnAdd = (item, option) => {
    return {
        type: ADD_ON_ADD,
        item,
        option
    }
}