import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Record<string, string | null>[]>([]);
    const [loading, setLoading] = useState(true);
    let [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
                const data = await res.json();
                setRecipes(data.meals);
            } catch (err) {
                console.error("Wystąpił błąd: ", err);
            } finally {
                setLoading(false);
            } 
        };

        getRecipes();
    }, [searchQuery]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    if (loading) {
        return <div className="text-center text-xl">Ładowanie przepisów...</div>;
    }

    if (!recipes) {
        return (
        <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lista Przepisów</h1>
            <input type="text" placeholder="Wyszukaj przepis" value={searchQuery} onChange={handleSearch}/>
        </div>
        )
    }

    // if (!recipes) {
    //     return(
    //         <div>
    //             <div className="text-center">
    //             <div className="text-center text-xl">Nie znaleziono przepisów.</div>
    //                 <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
    //                     Wróć do przepisów.
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

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

