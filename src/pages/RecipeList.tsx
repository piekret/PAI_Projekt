import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipe } from "../context/useRecipe";

export const RecipeList = () => {
    const [ apiRecipes, setapiRecipes ] = useState<Record<string, string | null>[]>([]);
    const [ loading, setLoading ] = useState(true);
    const { recipes } = useRecipe();
    let [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        const getapiRecipes = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
                const data = await res.json();
                setapiRecipes(data.meals);
            } catch (err) {
                console.error("Wystąpił błąd: ", err);
            } finally {
                setLoading(false);
            } 
        };

        getapiRecipes();
    }, [searchQuery]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    if (loading) {
        return <div className="text-center text-xl">Ładowanie przepisów...</div>;
    }

    if (!apiRecipes) {
        return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista Przepisów</h1>
            <input 
            type="text" 
            placeholder="Wyszukaj przepis"
            value={searchQuery} 
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
            />
        </div>
        )
    } else {
    return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista Przepisów</h1>
                <input
                    type="text"
                    placeholder="Wyszukaj przepis"
                    value={searchQuery}
                    onChange={handleSearch}
                    
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
                    />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {apiRecipes.map(r => (
                    <Link
                        to={`/recipes/${r.idMeal}`}
                        key={r.idMeal}
                        className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 transition-transform"
                    >
                        <div className="p-4">
                            <img
                                src={r.strMealThumb || ""}
                                alt={r.strMeal || ""}
                                className="w-full h-32 object-cover rounded mb-4"
                            />
                            <p className="text-lg font-medium text-gray-700">{r.strMeal}</p>
                        </div>
                    </Link>
                ))}
                {recipes.map(r => (
                    <Link
                    to={`/recipes/${r.name}`}
                    key={r.name}
                    className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 transition-transform"
                >
                    <div className="p-4">
                        <img
                            src={r.image}
                            alt={r.name}
                            className="w-full h-32 object-cover rounded mb-4"
                        />
                        <p className="text-lg font-medium text-gray-700">{r.name}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
    };
}