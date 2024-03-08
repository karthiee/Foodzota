import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './Button';
import CartContext from './CartContext';
import UserProfileContext from './UserProgressContext';
import UserProgressContext from './UserProgressContext';

export default function Header() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    console.log('cartCtx.items:', cartCtx.items);


    function handleShowCart(){
        userProgressCtx.showCart();
    }

    const totalQuantity = cartCtx.items.reduce((totalItem, item) => {
        return totalItem + item.quantity;
    },
        0);
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="food app logo" />
                <h1>Foodzota</h1>
            </div>
            <nav className='cart-button'>
                <Button textOnly onClick={handleShowCart}>Cart({totalQuantity})</Button>
            </nav>
        </header>
    );
}