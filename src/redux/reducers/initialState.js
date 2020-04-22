const image = 'https://i.pinimg.com/originals/23/84/5e/23845e70632989a1ea71d2c5ca88af00.png';

export const initialState = {
    items: [
        { id: 1, title: 'Brand Name', price: 110, img: image },
        { id: 2, title: 'Adidas', price: 80, img: image },
        { id: 3, title: 'Vans', price: 120, img: image },
        { id: 4, title: 'White', price: 260, img: image },
    ],
    addedItems: [],
    total: 0

}