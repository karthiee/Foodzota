import { currencyformatter } from "../util/currencyformatter";


export default function CartItem({name,quantity,price,onDecrease,onIncrease}){
return (
    <li className="cart-item">
        <p>
        {name}-{quantity} X {currencyformatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>

    </li>
);
}