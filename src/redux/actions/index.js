import { ADD_TO_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, ADD_ON_ADD, FETCH_DATA, CLEAR_STATE, GET_LANGUAGE, SET_INITIAL_SELECION, SET_EVENT } from "./actionTypes"
import _ from "lodash";
import firebase from 'react-native-firebase';
import LocalizedStrings from 'react-native-localization';

import english from '../../utils/locale/en'
import french from '../../utils/locale/fr'

const Seesha = firebase.firestore().collection('Seesha');
const Social = firebase.firestore().collection('Social');

const Whiskey12 = firebase.firestore().collection('Whiskey12');
const Whiskey15 = firebase.firestore().collection('Whiskey15');
const Whiskey18 = firebase.firestore().collection('Whiskey18');
const liquors = firebase.firestore().collection('liquors');
const Champagne = firebase.firestore().collection('Champagne');

const Whiskey12DD = firebase.firestore().collection('Whiskey12DD');
const Whiskey15DD = firebase.firestore().collection('Whiskey15DD');
const Whiskey18DD = firebase.firestore().collection('Whiskey18DD');
const liquorsDD = firebase.firestore().collection('liquorsDD');
const ChampagneDD = firebase.firestore().collection('ChampagneDD');
const FreeDD = firebase.firestore().collection('FreeDD');
const Vodka = firebase.firestore().collection('VodkaDD');

let items = [];
let itemsDD = [];
let items2 = [];
let items3 = [];
let items4 = []

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

liquorsDD.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});
Whiskey12DD.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});

Whiskey15DD.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});

Whiskey18DD.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});

ChampagneDD.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});

Vodka.get().then(snapshot => {
    snapshot.forEach(doc => {
        itemsDD.push(({ ...doc.data(), id: doc.id }))
    })
});

FreeDD.get().then(snapshot => {
    snapshot.forEach(doc => {
        items4.push(({ ...doc.data(), id: doc.id, quantity: 1 }))
    })
});


Seesha.get().then(snapshot => {
    snapshot.forEach(doc => {
        items2.push(({ ...doc.data(), id: doc.id, quantity: 0 }))
    })
});

Social.get().then(snapshot => {
    snapshot.forEach(doc => {
        items3.push(({ ...doc.data(), id: doc.id, quantity: 1 }))
    })
})

const strings = new LocalizedStrings({
    EN: english,
    FR: french,
});
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

export const setEvent = (id) => {
    return {
        type: SET_EVENT,
        payload: { id }
    }
}

export const getCurrentLanguage = (id) => {
    return {
        type: GET_LANGUAGE,
        payload: { strings, id }
    }
}

export const setInitialSelection = (id) => {
    return {
        type: SET_INITIAL_SELECION,
        payload: { id }
    }
}

export const fetchData = category => {
    switch (category) {
        case '': {
            // console.log('gg')
            // const items = getData('liquors');
            // console.log(items);
            return ({
                type: FETCH_DATA,
                payload: {
                    items,
                    category
                }

            })
        }
        case 'DD': {
            return ({
                type: FETCH_DATA,
                payload: {
                    items: itemsDD,
                    category: ''
                }

            })
        }

        case 'seesha': {
            return ({
                type: FETCH_DATA,
                payload: {
                    items: items2,
                    category
                }
            })
        }
        case 'games': {
            return ({
                type: FETCH_DATA,
                payload: {
                    items: items3,
                    category
                }
            })
        }
        case 'freeDD': {
            return ({
                type: FETCH_DATA,
                payload: {
                    items: items4,
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
export const clearState = () => {
    return {
        type: CLEAR_STATE,
    }
}

