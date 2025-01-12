import { useForm } from 'react-hook-form';
import { useRecipe } from '../context/useRecipe';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  name: string;
  category: string;
  cuisine: string;
  ingredients: string;
  image: string;
  instructions: string;
};

export const AddRecipe = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const { addRecipe } = useRecipe();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const recipe = {
      ...data,
      ingredients: data.ingredients.split(',').map(s => s.trim())
    };
    addRecipe(recipe);
    navigate('/recipes')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            {...register('name', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category:</label>
          <select
            {...register('category', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select category</option>
            <option value="pasta">Pasta</option>
            <option value="seafood">Seafood</option>
            <option value="meat">Meat</option>
            <option value="dessert">Dessert</option>
            <option value="soup">Soup</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Cuisine:</label>
          <input
            {...register('cuisine', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.cuisine && <span className="text-red-500 text-sm">{errors.cuisine.message}</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Ingredients (separate by ,):</label>
          <textarea
            {...register('ingredients', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.ingredients && <span className="text-red-500 text-sm">{errors.ingredients.message}</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Image (URL):</label>
          <input
            {...register('image', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Instructions:</label>
          <textarea
            {...register('instructions', { required: 'This field is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
          {errors.instructions && <span className="text-red-500 text-sm">{errors.instructions.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};