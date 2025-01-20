import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipe } from "../context/useRecipe";
import type { Recipe } from "../context/RecipeContext";

type ApiRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

type Combined = ApiRecipe | Recipe

export const RecipeList = () => {
  const [apiRecipes, setApiRecipes] = useState<ApiRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { recipes } = useRecipe();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        if (category) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setApiRecipes(data.meals || []);
        console.log(url);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    console.log(apiRecipes);
  }, [category]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredApiRecipes = apiRecipes.filter((recipe) => {
    if (recipe.strMeal) {
      return recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const filteredUserRecipes = recipes.filter((recipe) => {
    if (recipe.name) {
      return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const combinedRecipes: Combined[] = [...filteredApiRecipes, ...filteredUserRecipes];

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-8
      bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div
        className="w-full max-w-screen-xl p-6 md:p-10 bg-white border-2 border-[#c2b280] rounded-xl relative mt-10 mb-10"
        style={{
          boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#8b4513] text-center mb-8">
          Recipe List
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition w-full md:w-auto"
          />
          <Link
            to="/add-recipe"
            className="px-6 py-3 text-lg font-medium bg-[#f8f3e7] text-[#8b4513] border border-[#c2b280] rounded-lg shadow hover:bg-[#f2e8d8] transition-transform transform hover:-translate-y-1"
          >
            Add new recipe
          </Link>
          <select
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513]transition"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value="">All</option>
            {categories.map(c => (
              <option key={c.idCategory} value={c.strCategory}>
                {c.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          {combinedRecipes.map(r => (
            <Link
              to={"idMeal" in r ? `/recipes/${r.idMeal}` : `/recipes/user-${r.id}`}
              key={"idMeal" in r ? r.idMeal : r.id}
              className="relative overflow-hidden group rounded-xl shadow-lg bg-[#fdfaf4] border border-[#e6dec9] hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <div className="w-full h-40 overflow-hidden rounded-t-xl">
                <img src={"strMealThumb" in r ? r.strMealThumb : r.image} alt={"strMeal" in r ? r.strMeal : r.name} className="w-full h-full object-cover"/>
              </div>
              
              <div className="p-4">
                <p className="text-lg font-medium text-[#8b4513] mb-2 text-center">
                  {"strMeal" in r ? r.strMeal : r.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
};
