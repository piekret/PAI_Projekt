import { useParams } from "react-router-dom";
import { useRecipe } from "../context/useRecipe";

export const UserRecipeItem = () => {
    const {id} = useParams();
    const {recipes} = useRecipe();

    const recipe = recipes.find(r => r.id == id)
    if (!recipe) {
        return <div className="text-center text-xl">User Recipe not found</div>;
    }

    return (
        <div className="mx-auto max-w-3xl p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{recipe.name}</h1>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full max-w-sm mx-auto rounded-lg mb-6"
          />
    
          <div className="rounded-md shadow-sm p-4 mb-6 bg-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Information</h2>
            <h3 className="text-gray-600">Category: {recipe.category}</h3>
            <h3 className="text-gray-600">Cuisine: {recipe.cuisine}</h3>
          </div>
    
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ingredients:</h2>
          <ul className="text-left text-gray-600 list-disc list-inside">
            {recipe.ingredients.map(i => (
              <li key={i}>{i}</li>
            ))}
          </ul>
    
          <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">Instructions:</h2>
          <p className="text-gray-600 text-left whitespace-pre-wrap bg-gray-100 rounded-md p-2">
            {recipe.instructions}
          </p>
        </div>
      )
}