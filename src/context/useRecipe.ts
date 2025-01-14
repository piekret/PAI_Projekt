import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

export const useRecipe = () => {
    const context = useContext(RecipeContext);

    if (!context) {
        throw new Error("used outside of the provider");
    }

    return context
}