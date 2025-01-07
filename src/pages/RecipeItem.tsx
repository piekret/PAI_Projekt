import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const RecipeItem = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<Record<string, string | null>>();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                setRecipe(data.meals[0]);
            } catch(err) {
                console.error("Wystąpił błąd: ", err);
            }
        }
        getRecipe();
    }, []);

    return (
        <>
            <h1>{recipe.strMeal}</h1>
        </>
    )
}