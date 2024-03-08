import Button from "./Button";
import { currencyformatter } from "../util/currencyformatter";
import { useContext } from "react";
import CartContext from "./CartContext";


export default function MealItems({ meal }) {

    const cartCtx=useContext(CartContext);


    function addToCartHandler() {
        console.log('clicked');
        cartCtx.addItem(meal);
    }
    return (
        <li className="meal-item">
            <article>
               <img src={`http://localhost:3000/${meal.image}`} alt='Item Image' />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price"> {currencyformatter.format(meal.price)} </p>
                    <p className="meal-item=description"> {meal.description} </p>
                </div>
                <p className='meal-item-actions'>
                    <Button textOnly={false} onClick={addToCartHandler} >
                        Add to cart
                    </Button>
                </p>
            </article>
        </li>
    );

}