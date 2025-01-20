import { useState, type PropsWithChildren } from "react";
import { RecipeContext, type Recipe, type RecipeNoId } from "./RecipeContext";

export const RecipeProvider = ({ children }: PropsWithChildren) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [id, setId] = useState(0);
    const [favs, setFavs] = useState<Record<string, string | string[] | number>[]>([]);

    const addRecipe = (recipe: RecipeNoId) => {
        setRecipes(recs => [...recs, {...recipe, id: id}])
        setId(prev => prev + 1);
    }

    const addToFav = (recipe: Record<string, string | string[] | number>) => {
        setFavs(prev => {
            if (prev.find(fav => (fav.id || fav.idMeal) == (recipe.id || recipe.idMeal))) {return prev;}
            return [...prev, recipe];
        })
    }

    const removeFromFav = (id: number) => {
        setFavs(prev => prev.filter(fav => {return ("id" in fav ? fav.id : fav.idMeal) != id}));
        console.log(id);
    }

    return (
        <RecipeContext.Provider value={{recipes, favs, addRecipe, addToFav, removeFromFav}}>
            {children}
        </RecipeContext.Provider>
    )
}