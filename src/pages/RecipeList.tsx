import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RecipeList.css"

export const RecipeList = () => {
    const [recipes, setRecipes] = useState<Record<string, string | null>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
                const data = await res.json();
                setRecipes(data.meals)
            } catch(err) {
                console.error("Wystąpił błąd: ", err);
            } finally {
                setLoading(false);
            }
        }

        getRecipes();
    }, [])

    if (loading) {
        return <div>ładowanie przepisów</div>
    }

    return (
        <div className="list">
            <h1 className="title">Lista Przepisow</h1>
            <div className="container">
                {recipes.map((r) => (
                    <Link to={`/recipes/${r.idMeal}`} key={r.idMeal} style={{ display: "block", margin: "1rem 0" }}>
                        <div className="recipe">
                            <p>{r.strMeal}</p>
                            <img src={r.strMealThumb} alt={r.strMeal} style={{ width: "100px", marginRight: "1rem" }}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}