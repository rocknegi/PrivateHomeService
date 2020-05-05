import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, SUB_OPTION, ADD_OPTION, ADD_ON_ADD, FETCH_DATA } from "./actionTypes"


const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

const items = [
    { id: '1liquors', title: 'Brand Name', price: 110, img: image, category: 'liquors' },
    { id: '2liquors', title: 'Brand Name', price: 110, img: image, category: 'Champagne' },
    { id: '1Whiskey12', title: 'Brand Name', price: 80, img: image, category: 'Whiskey12' },
    { id: '1Whiskey19', title: 'Brand Name', price: 120, img: image, category: 'Whiskey19' },
    { id: '1Whiskey18', title: 'Brand Name', price: 260, img: image, category: 'Whiskey18' },
]

const items2 = [
    { id: 'option1', title: 'Item 1', price: 11, img: image,quantity:0, category: 'seesha' },
    { id: 'option2', title: 'Item 2', price: 8, img: image,quantity:0 , category: 'seesha' },
    { id: 'option3', title: 'Item 3', price: 12, img: image ,quantity:0, category: 'seesha' },
    { id: 'option4', title: 'Item 4', price: 20, img: image,quantity:0 , category: 'seesha' },
]

const items3 = [
    // { id: 'free1', title: 'Oty', price: 'free', quantity:1, category: 'games' },
    // { id: 'free2', title: 'Time', price: 'free', quantity:1 , category: 'games' },
    { id: 'paid1', title: 'Time', price: 5, quantity:1 , category: 'games' },
]

export const fetchData = (category) => {
    if (category === '') {
        return {
            type: FETCH_DATA,
            payload: {
                items,
                category
            }

        }
    }
    else if(category==='games'){
        return{
            type:FETCH_DATA,
            payload:{
                items:items3,
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
}

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

export const subQuantity = (id,category) => {
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