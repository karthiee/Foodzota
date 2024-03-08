import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: () => { },
    resetCart: () => { }
});


function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex((item) => (item.id === action.item.id));
        const updatedItems = [...state.items];
        if (existingItemIndex != -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingItemIndex] = updatedItem;
        }
        else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return { ...state, items: updatedItems }
    }
    if (action.type === 'REMOVE_ITEM') {
        const existingItemIndex = state.items.findIndex((item) => (item.id === action.id)); //action.item.id poten error adichichu, direct a .id bcz id tha passpanrom
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];

        if (existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1);
        }
        else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            };
            updatedItems[existingItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems }   
    }


    if (action.type === 'RESET_CART') {
        return { items: [] };
    }
     return state;
}

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item
        });
    }

    function removeItem(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        });
    }

    function resetCart() {
        dispatchCartAction({
            type: 'RESET_CART'
        })
    }
    const cartContext = {
        items: cart.items,   //.items poten suthama varala..unlimited loading agite irunchu aproma items pota tha matha usecontext la use pana mudithu , Need to check a glance once.
        addItem,
        removeItem,
        resetCart
    };
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};


export default CartContext;