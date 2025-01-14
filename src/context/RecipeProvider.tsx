import { useState, type PropsWithChildren } from "react";
import { RecipeContext, type Recipe, type RecipeNoId } from "./RecipeContext";

export const RecipeProvider = ({ children }: PropsWithChildren) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [id, setId] = useState(0);
    
    const addRecipe = (recipe: RecipeNoId) => {
        setRecipes(recs => [...recs, {...recipe, id: id}])
        setId(prev => prev + 1);
    }

    return (
        <RecipeContext.Provider value={{recipes, addRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}