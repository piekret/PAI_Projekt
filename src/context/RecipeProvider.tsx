import { useState, type PropsWithChildren } from "react";
import { RecipeContext, type Recipe } from "./RecipeContext";

export const RecipeProvider = ({ children }: PropsWithChildren) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    
    const addRecipe = (recipe: Recipe) => {
        setRecipes(recs => [...recs, recipe])
    }

    return (
        <RecipeContext.Provider value={{recipes, addRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}