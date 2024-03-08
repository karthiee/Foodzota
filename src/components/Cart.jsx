import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "./CartContext";
import UserProgressContext from "./UserProgressContext";
import CartItem from "./CartItem";
import { currencyformatter } from "../util/currencyformatter";
import Button from "./Button";
import waitingOrder from '../assets/waiting_order.jpg';


export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const CartTotalAmount = cartCtx.items.reduce((totalItem, item) => {
        return totalItem + (item.quantity * item.price)
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleCheckout(){
        userProgressCtx.showCheckout();
    }

    return (
        <Modal open={userProgressCtx.progressStatus === 'cart'}>
            <h2 id="cart-title">Cart Summary!</h2>
            {
                cartCtx.items.length === 0 &&
                <div className="cart-empty-message">
                    <h3 id="cart-title">Why wait? Order and Enjoy!</h3>
                    <img src={waitingOrder} />
                </div>
            }

            {cartCtx.items.length != 0 && <h3 id="cart-title">Don't wait to full your stomach, Order soon !</h3>}
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
                        onDecrease={() => { cartCtx.removeItem(item.id) }}
                        onIncrease={() => { cartCtx.addItem(item) }}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyformatter.format(CartTotalAmount)}</p>
            <p className="modal-actions">
                <Button textOnly={false} onClick={handleCloseCart}>
                    Close
                </Button>
                {cartCtx.items.length >0 && <Button onClick={handleCheckout} textOnly={false}> Proceed To Checkout</Button>}
            </p>

        </Modal>
    );
}