import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipe } from "../context/useRecipe";

export const RecipeList = () => {
    const [ apiRecipes, setapiRecipes ] = useState<Record<string, string | null>[]>([]);
    const [ loading, setLoading ] = useState(true);
    const { recipes } = useRecipe();
    const [searchQuery, setSearchQuery] = useState("");
    
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

    const FiltredRecipes = recipes.filter(recipes => recipes.name.includes(searchQuery))
    // console.log("abc dupa123 ")
    // console.log(FiltredRecipes)
    // console.log(FiltredRecipes.length === 0)
    // console.log(recipes != null)
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    if (loading) {
        return <div className="text-center text-xl">Loading ok ok</div>;
    }

    if (!apiRecipes) {
        return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe List</h1>
            <input 
                type="text" 
                placeholder="Search"
                value={searchQuery} 
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
            />
                <Link
                    to="/add-recipe"
                    className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px] ml-5">
                    Add new recipe
                </Link>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {FiltredRecipes.map(r => (
                    <Link
                    to={`/recipes/user-${r.id}`}
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
    } else if (recipes != null && FiltredRecipes.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe List</h1>
                <input 	
                    type="text" 
                    placeholder="Search"
                    value={searchQuery} 
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
                    />
                <Link
                    to="/add-recipe"
                    className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px] ml-5"
                    >Add new recipe</Link>
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
                </div>        
            </div>
            )
    } else if (!apiRecipes && (recipes != null && FiltredRecipes.length === 0)) {
        return (
            <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe List</h1>
                    <input 
                    type="text" 
                    placeholder="Search"
                    value={searchQuery} 
                    onChange={handleSearch}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
                    />
                    <Link
                    to="/add-recipe"
                    className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px] ml-5"
                    >Add new recipe</Link>
            </div>
            )
    } else {

    return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe List</h1>
                <input
                    type="text"
                    placeholder="Wyszukaj przepis"
                    value={searchQuery}
                    onChange={handleSearch}
                    
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[30px]"
                    />
                <Link
                to="/add-recipe"
                className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px] ml-5"
                >Add new recipe</Link>
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
                {FiltredRecipes.map(r => (
                    <Link
                    to={`/recipes/user-${r.id}`}
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