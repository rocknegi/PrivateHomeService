import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, ADD_ON_ADD, FETCH_DATA } from "./actionTypes"
import _ from "lodash";
import firestore from '@react-native-firebase/firestore';

const Seesha = firestore().collection('Seesha');
const Social = firestore().collection('Social');
const Whiskey12 = firestore().collection('Whiskey12');
const Whiskey15 = firestore().collection('Whiskey15');
const Whiskey18 = firestore().collection('Whiskey18');
const liquors = firestore().collection('liquors');
const Champagne = firestore().collection('Champagne');

let items=[];
let items2=[];
let items3=[];

liquors.get().then(snapshot => {
    snapshot.forEach(doc => {
        items.push(({ ...doc.data(), id: doc.id }))
    })
});
Whiskey12.get().then(snapshot => {
    snapshot.forEach(doc => {
        items.push(({ ...doc.data(), id: doc.id }))
    })
});

Whiskey15.get().then(snapshot => {
    snapshot.forEach(doc => {
        items.push(({ ...doc.data(), id: doc.id }))
    })
});

Whiskey18.get().then(snapshot => {
    snapshot.forEach(doc => {
        items.push(({ ...doc.data(), id: doc.id }))
    })
});

Champagne.get().then(snapshot => {
    snapshot.forEach(doc => {
        items.push(({ ...doc.data(), id: doc.id }))
    })
});

Seesha.get().then(snapshot => {
    snapshot.forEach(doc => {
        items2.push(({ ...doc.data(), id: doc.id,quantity:0 }))
    })
});

Social.get().then(snapshot=>{
    snapshot.forEach(doc=>{
        items3.push(({ ...doc.data(), id: doc.id,quantity:1 }))
    })
})
const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

// const items2 = [
//     { id: 'option1', title: 'seesha 1', price: 52, img: image, quantity: 0, category: 'seesha' },
//     { id: 'option2', title: 'seesha 2', price: 10, img: image, quantity: 0, category: 'seesha' },
//     { id: 'option3', title: 'seesha 3', price: 12, img: image, quantity: 0, category: 'seesha' },
//     { id: 'option4', title: 'seesha 4', price: 20, img: image, quantity: 0, category: 'seesha' },
// ]

// const items3 = [
//     { id: 'paid1', title: 'Time', price: 5, quantity: 1, category: 'games' },
// ]

export const fetchData = category => {
    switch (category) {
        case '': {
            // console.log('gg')
            // const items = getData('liquors');
            // console.log(items);
            return({
                type: FETCH_DATA,
                payload: {
                    items,
                    category
                }

            })
        }

        case 'seesha': {
            return({
                type: FETCH_DATA,
                payload: {
                    items: items2,
                    category
                }
            })
        }
        case 'games': {
            return({
                type: FETCH_DATA,
                payload: {
                    items: items3,
                    category
                }
            })
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

