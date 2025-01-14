import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

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
        return <div className="text-center text-xl">Loading ok ok</div>;
    }

    const ingredients = getIngredients();

    return (
        <div className="mx-auto max-w-3xl p-8 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full max-w-sm mx-auto rounded-lg mb-6" />

            <div className="rounded-md shadow-sm p-4 mb-6 bg-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Informacje</h2>
                <h3 className="text-gray-600">Category: {recipe.strCategory}</h3>
                <h3 className="text-gray-600">Cuisine: {recipe.strArea}</h3>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingredients:</h2>
            <ul className="text-left text-gray-600 list-disc list-inside">
                {ingredients.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>

            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">Instructions:</h2>
            <p className="text-gray-600 text-left whitespace-pre-wrap bg-gray-100 rounded-md p-2">{recipe.strInstructions}</p>
        </div>
    )
}