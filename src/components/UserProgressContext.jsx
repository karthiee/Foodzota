import { createContext, useReducer, useState } from "react";

const UserProgressContext = createContext({
    progressStatus: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
    showOrderConfirm: () => { },
    hideOrderConfirm: () => { }
});

export function UserProgressContextProvider({ children }) {

    const [progress, setProgress] = useState('');

    function showCart() {
        setProgress('cart');
    }
    function hideCart() {
        setProgress('');
    }
    function showCheckout() {
        setProgress('checkout');
    }
    function hideCheckout() {
        setProgress('');
    }
    function showOrderConfirm() {
        setProgress('orderConfirm');
    }
    function hideOrderConfirm() {
        setProgress('');
    }
    const userProgressContext = {
        progressStatus: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showOrderConfirm,
        hideOrderConfirm
    }


    return (<UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>);
}

export default UserProgressContext;