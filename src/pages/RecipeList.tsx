import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecipe } from "../context/useRecipe";

export const RecipeList = () => {
  const [apiRecipes, setApiRecipes] = useState<Record<string, string | null>[]>([]);
  const [loading, setLoading] = useState(false);
  const { recipes } = useRecipe();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

        if (category) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setApiRecipes(data.meals || []);
        console.log(url)
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    console.log(apiRecipes)
  }, [category]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredApiRecipes = apiRecipes.filter(recipe => {
    if (recipe.strMeal) {
        return recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
    } return false;
  })

  console.log(filteredApiRecipes)

  const filteredUserRecipes = recipes.filter(recipe => {
    if (recipe.name) {
       return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    } return false;
  })

  const combinedRecipes = [...filteredApiRecipes, ...filteredUserRecipes]

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-8 text-center bg-gray-100 min-h-screen rounded mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Recipe List</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <Link
          to="/add-recipe"
          className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px] ml-5"
        >
          Add new recipe
        </Link>
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ml-8 mb-8"
          onChange={e => setCategory(e.target.value)}
          value={category}
        >
          <option value="">All</option>
          {categories.map(c => (
            <option key={c.idCategory} value={c.strCategory}>{c.strCategory}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {combinedRecipes.map(r => (
          <Link
            to={r.idMeal ? `/recipes/${r.idMeal}` : `/recipes/user-${r.id}`}
            key={r.idMeal || r.name}
            className="border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 transition-transform"
          >
            <div className="p-4">
              <img
                src={r.strMealThumb || r.image}
                alt={r.strMeal || r.name}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <p className="text-lg font-medium text-gray-700">{r.strMeal || r.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
