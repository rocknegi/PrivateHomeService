import firestore from '@react-native-firebase/firestore';

const Seesha = firestore().collection('Seesha');
const Social = firestore().collection('Social');

const Whiskey12 = firestore().collection('Whiskey12');
const Whiskey15 = firestore().collection('Whiskey15');
const Whiskey18 = firestore().collection('Whiskey18');
const liquors = firestore().collection('liquors');
const Champagne = firestore().collection('Champagne');

let customItems = [];

export const getData = (category) => {
    switch (category) {
        case 'liquors': {
            let liquor=[];
            liquors.get().then(snapshot => {
                snapshot.forEach(doc => {
                    liquor.push(({ ...doc.data(), id: doc.id }))
                })
            });

            return liquor
        }
        default : return null
    }
}



export function getData2(category) {


    Whiskey12.get().then(snapshot => {
        snapshot.forEach(doc => {
            customItems.push(({ ...doc.data(), id: doc.id }))
        })
    });

    Whiskey15.get().then(snapshot => {
        snapshot.forEach(doc => {
            customItems.push(({ ...doc.data(), id: doc.id }))
        })
    });

    Whiskey18.get().then(snapshot => {
        snapshot.forEach(doc => {
            customItems.push(({ ...doc.data(), id: doc.id }))
        })
    });

    Champagne.get().then(snapshot => {
        snapshot.forEach(doc => {
            customItems.push(({ ...doc.data(), id: doc.id }))
        })
    });
    return customItems
}