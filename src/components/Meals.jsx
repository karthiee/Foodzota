import { useEffect } from "react";
import { useState } from "react";
import {} from '../../backend/data/available-meals.json';
import MealItems from "./MealItems";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);
    useEffect (()=>{
        async function fetchMeals() {
            try{
                const response = await fetch('http://localhost:3000/meals');
            const mealsData = await response.json();
            setLoadedMeals(mealsData);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchMeals();
    },[])
    
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItems key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}