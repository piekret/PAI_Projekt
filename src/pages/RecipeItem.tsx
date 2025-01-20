import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {useRecipe} from "../context/useRecipe";

export const RecipeItem = () => {
    // pobranie id przepisu z linkow
    const {id} = useParams();
    const [recipe, setRecipe] = useState<Record<string, string | string[] | number> | null>();
    const [loading, setLoading] = useState(true);
    const {recipes, addToFav} = useRecipe();
    const [isUser, setIsUser] = useState(false)

    // pobieranie przepisu z api na podstawie id z parametrow w linku
    useEffect(() => {
        const getRecipe = async () => {
            try {
                // sprawdzenie czy przepis jest uzytkownika
                if (id && id.startsWith("user-")) {
                    // obsługa przepisu jesli jest użytkownika
                    const userRecipeId = id.split("-")[1];
                    const userRecipe = recipes.find(r => String(r.id) == userRecipeId);
                    setRecipe(userRecipe || null);
                    setIsUser(true);
                } else {
                    // obsługa przepisu jeśli jest z api
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    const data = await res.json();
                    setRecipe(data.meals ? data.meals[0] : null);
                }
            } catch(err) {
                console.error("Trouble finding the recipe: ", err);
            } finally {
                setLoading(false);
            }
        }
        getRecipe();
    }, [id, recipes]);

    // obsługa loading state
    if (loading) {
        return <div className="text-center text-xl">Loading ok ok</div>;
    }

    if (!recipe) {
        return <div className="text-center text-xl">Recipe not found</div>
    }

    // składniki
    const getIngredients = () => {
        // obsługa składników jest przepis jest użytkownika
        if (isUser) {
            return recipe.ingredients;
        }

        if (!recipe) {
            return [];
        }

        const ingredients = [];

        // obsługa składnikow jeśli przepis jest z api
        for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`]) ingredients.push(recipe[`strIngredient${i}`]);
        }
        return ingredients;
    }

    const ingredients = getIngredients();

    // wyświetlenie szczegółów danego przepisu
    return (
        <div className="bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
                <div 
                className="mx-auto max-w-3xl p-8 bg-white rounded-lg shadow-md text-center"
                style={{
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
                }}
            >
                <h1 className="text-4xl font-bold text-[#8b4513] mb-6">{recipe.strMeal || recipe.name}</h1>
                {recipe.strMealThumb || recipe.image ? (
                    <img src={String(recipe.strMealThumb || recipe.image)} alt={String(recipe.strMeal || recipe.name)} className="w-full max-w-sm mx-auto rounded-lg mb-6 shadow-lg border-2 border-[#c2b280]" />
                ) : null}

                {/* dodanie przepisu do ulubionych */}
                <div className="mb-6 flex justify-center gap-4">
                    <button
                        onClick={() => addToFav(recipe)}
                        className="px-4 py-2 bg-[#f8f3e7] text-[#8b4513] border border-[#c2b280] rounded-lg shadow hover:bg-[#f2e8d8] transition-transform transform hover:-translate-y-1"
                    >
                    ⭐
                    </button>
                    <Link
                        to="/favs"
                        className="px-4 py-2 bg-[#f8f3e7] text-[#8b4513] border border-[#c2b280] rounded-lg shadow hover:bg-[#f2e8d8] transition-transform transform hover:-translate-y-1"
                    >
                        View Favorites
                    </Link>
                </div>

                <div className="rounded-md shadow-md p-4 mb-6 bg-[#fdfaf4] border border-[#e6dec9]">
                    <h2 className="text-lg font-semibold text-[#8b4513] mb-2">Details</h2>
                    <h3 className="text-gray-600">Category: {recipe.strCategory || recipe.category}</h3>
                    <h3 className="text-gray-600">Cuisine: {recipe.strArea || recipe.cuisine}</h3>
                </div>

                <h2 className="text-lg font-semibold text-[#8b4513] mb-4">Ingredients:</h2>
                <ul className="text-left text-gray-600 list-disc list-inside mb-6">
                    {Array.isArray(ingredients) && ingredients.map(i => (
                        <div>
                            <li key={String(i)}>{i}</li>
                        </div>
                        
                    ))}
                </ul>

                <h2 className="text-lg font-semibold text-[#8b4513] mt-6 mb-4">Instructions:</h2>
                <p className="text-gray-600 text-left whitespace-pre-wrap bg-[#fdfaf4] rounded-md p-4 border border-[#e6dec9] shadow-md">
                    {recipe.strInstructions || recipe.instructions}
                </p>
            </div>
        </div>
       
    )
}
