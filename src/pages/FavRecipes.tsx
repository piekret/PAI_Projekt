import { useRecipe } from "../context/useRecipe";
import { Link } from "react-router-dom";

export const FavRecipes = () => {
    const {favs, removeFromFav} = useRecipe();

    // lista ulubionych przepisow
    return (
        <div 
          className="p-8 text-center bg-[#f8f3e7] min-h-screen
          bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeat"  
        >
            <h1 
              className="text-3xl font-bold text-[#8b4513] mb-6 inline-block bg-white px-4 py-2 rounded-lg shadow-md"
              style={{
                boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
              }}
            >
                Favorite Recipes
              </h1>
            {favs.length === 0 ? (
                <p className="text-[#8b4513] bg-white px-4 py-2 rounded-lg shadow-md max-w-96 mx-auto">No favorite recipes yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favs.map(r => (
                        <div
                            key={String(r.id || r.idMeal)}
                            className="border border-[#e6dec9] rounded-lg bg-white shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                            style={{
                              boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
                            }}
                        >   {/*link na podstawie czy recipe jest uzytkownika czy z api*/}
                            <Link to={r.idMeal ? `/recipes/${r.idMeal}` : `/recipes/user-${r.id}`}>
                                <img
                                    src={String(r.strMealThumb || r.image)}
                                    alt={String(r.strMeal || r.name)}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                />
                            </Link>

                            <div className="p-4">
                                <h2 className="text-lg font-medium text-[#8b4513] mb-4">{r.strMeal || r.name}</h2>
                                <button
                                    onClick={() => {
                                        const id = "id" in r ? r.id : r.idMeal
                                        removeFromFav(Number(id))
                                    }}
                                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition"
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
};
