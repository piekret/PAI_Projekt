import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Record<string, string | null>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
                const data = await res.json();
                setRecipes(data.meals);
            } catch (err) {
                console.error("Wystąpił błąd: ", err);
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    if (loading) {
        return <div className="text-center text-xl">Ładowanie przepisów...</div>;
    }

    return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista Przepisów</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((r) => (
                    <Link
                        to={`/recipes/${r.idMeal}`}
                        key={r.idMeal}
                        className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 transition-transform"
                    >
                        <div className="p-4">
                            <img
                                src={r.strMealThumb}
                                alt={r.strMeal}
                                className="w-full h-32 object-cover rounded mb-4"
                            />
                            <p className="text-lg font-medium text-gray-700">{r.strMeal}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};
