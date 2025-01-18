import { useRecipe } from "../context/useRecipe";
import { Link } from "react-router-dom";

export const FavRecipes = () => {
    const {favs, removeFromFav} = useRecipe();

    return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Recipes</h1>
          {favs.length === 0 ? (
            <p className="text-gray-600">No favorite recipes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favs.map(r => (
                <div
                  key={r.id || r.idMeal}
                  className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 transition-transform"
                >
                <Link to={r.idMeal ? `/recipes/${r.idMeal}`: `/recipes/user-${r.id}`}>
                    <img
                        src={r.strMealThumb || r.image}
                        alt={r.strMeal || r.name}
                        className="w-full h-32 object-cover rounded mb-4"
                    />
                </Link>
                  
                  <div className="p-4">
                    <h2 className="text-lg font-medium text-gray-700">{r.strMeal || r.name}</h2>
                    <button
                      onClick={() => removeFromFav(r.id || r.idMeal)}
                      className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}