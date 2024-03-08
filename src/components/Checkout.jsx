import { useContext, useEffect } from "react";
import Modal from "./Modal";
import UserProgressContext from "./UserProgressContext";
import CartContext from "./CartContext";
import { currencyformatter } from "../util/currencyformatter";
import Input from "./Input";
import Button from "./Button";
import { dateFormatter } from "../util/dateFormatter";


export default function Checkout() {

    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);

    let timeStamp = Date.now();
    const timeNow = dateFormatter.format(timeStamp);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + (item.quantity * item.price);
    }, 0);

    const cartTotalQuantity = cartCtx.items.reduce((totalquantity, item) => {
        return totalquantity + item.quantity
    }, 0);


    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        fetch('https://myfoodapp-1459e-default-rtdb.firebaseio.com/Orders.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [timeNow]: {
                    ordersDetail: {
                        itemDetails: {
                            items: cartCtx.items,
                            totalQuantity: cartTotalQuantity,
                            totalPrice: cartTotal
                        },
                        customer: customerData
                    }
                }
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(error => {
                console.log(error);
            });

        userProgressCtx.showOrderConfirm();
    };


    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    return (
        <Modal open={userProgressCtx.progressStatus === 'checkout'}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Checkout</h2>
                <p style={{ fontWeight: 'bold', fontSize: '1.3em' }}>TotalAmount : {currencyformatter.format(cartTotal)} </p>
                <div className="input-form">
                    <Input label='Email' id='email' type='email' />
                    <Input label='Name' id='name' type='text' />
                    <Input label='Phone Number' id='PhoneNumber' type='text' maxLength='10' />
                    <Input label='Address' id='address' type='text' />
                    <div className="control-row">
                        <Input label="Postal Code" type="text" id="postal-code" />
                        <Input label="City" type="text" id="city" />
                    </div>
                </div>

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );

}