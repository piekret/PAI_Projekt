import { useForm } from 'react-hook-form';
import { useRecipe } from '../context/useRecipe';
import type { RecipeNoId } from '../context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type FormValues = Omit<RecipeNoId, "ingredients"> & {
  ingredients: string
}

export const AddRecipe = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { addRecipe } = useRecipe();
  const [categories, setCategories] = useState<Record<string, string>[]>([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const onSubmit = (data: FormValues) => {
    const recipe = {
      ...data,
      ingredients: data.ingredients.split(',').map(s => s.trim())
    };
    addRecipe(recipe);

    navigate('/recipes')
  };

  if (loading) {
    return <div className="text-center text-xl">Loading ok ok</div>;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen 
      bg-[#f8f3e7] bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl w-full bg-white shadow-2xl rounded-xl p-6 space-y-6 border border-[#c2b280]"
        style={{
          boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
        }}
      >
        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Name'>Name:</label>
          <input
            {...register('name', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id="Name"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Category'>Category:</label>
          <select
            {...register('category', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id='Category'
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.idCategory} value={c.strCategory}>{c.strCategory}</option>
            ))}
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Cuisine'>Cuisine:</label>
          <input
            {...register('cuisine', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id='Cuisine'
          />
          {errors.cuisine && <span className="text-red-500 text-sm">{errors.cuisine.message}</span>}
        </div>

        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Ingredients'>Ingredients (separate with ,):</label>
          <textarea
            {...register('ingredients', { required: 'This field is required',  validate: (value) =>
              value.split(",").every(s => s.trim().length > 0) || "Each ingredient must be non-empty", })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id='Ingredients'
          />
          {errors.ingredients && <span className="text-red-500 text-sm">{errors.ingredients.message}</span>}
        </div>

        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Image'>Image (URL):</label>
          <input
            type="url"
            {...register('image', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id='Image'
          />
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        <div>
          <label className="block text-[#8b4513] font-medium mb-2" htmlFor='Instructions'>Instructions:</label>
          <textarea
            {...register('instructions', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
            id='Instructions'
          />
          {errors.instructions && <span className="text-red-500 text-sm">{errors.instructions.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#8b4513] text-white py-3 rounded-lg font-medium hover:bg-[#6f3610] focus:outline-none focus:ring-2 focus:ring-[#8b4513] transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};
