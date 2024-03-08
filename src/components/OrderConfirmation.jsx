import { useContext } from "react"
import UserProgressContext from "./UserProgressContext"
import Modal from "./Modal";
import Button from "./Button";
import CartContext from "./CartContext";
import orderConfirmImg from "../assets/orderConfirmChefImg.jpg"

export default function OrderConfirmation() {

    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);


    function handleCloseConfirmationPage() {
        userProgressCtx.hideOrderConfirm();
        cartCtx.resetCart();
    }
    return (
        <Modal open={userProgressCtx.progressStatus === 'orderConfirm'}>
            <div className="order-confirm">
                <h1>Your Order is Confirmed!</h1>
                <p>Thank you for Ordering! Please sit back and relax.</p>
                <p> We are making the dish special for you! </p>
                <div><img src={orderConfirmImg} /></div>
            </div>
            <p className="modal-actions">
                <Button type="button" onClick={handleCloseConfirmationPage}>Okay!</Button>
            </p>

        </Modal>


    )

}