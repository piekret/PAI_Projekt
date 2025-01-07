import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../styles/RecipeItem.css"

export const RecipeItem = () => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<Record<string, string | null> | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await res.json();
                setRecipe(data.meals[0]);
            } catch(err) {
                console.error("Wystąpił błąd: ", err);
            } finally {
                setLoading(false);
            }
        }
        getRecipe();
    }, [id]);

    const getIngredients = () => {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`]) ingredients.push(recipe[`strIngredient${i}`]);
        }
        return ingredients
    }

    if (loading) {
        return <p>Czekaj bo ładuje</p>
    }

    const ingredients = getIngredients();

    return (
        <div className="item">
            <h1 className="name box-shadow">{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} className="img" />

            <div className="info-container">
                <h2 className="info"><strong>Informacje</strong></h2>
                <h3 className="info">Kategoria: {recipe.strCategory}</h3>
                <h3 className="info">Kuchnia: {recipe.strArea}</h3>
            </div>
                
            <h2 className="info box-shadow"><strong>Potrzebne składniki:</strong></h2>
            <ul className="instructions">
                {ingredients.map((i) => (
                    <li key={i}>
                        {i}
                    </li>
                ))}
            </ul>

            <h2 className="info box-shadow"><strong>Instrukcja przygotowania:</strong></h2>
            <p className="instructions">{recipe.strInstructions}</p>
        </div>
    )
}