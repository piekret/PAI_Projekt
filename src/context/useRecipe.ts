import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";

export const useRecipe = () => {
    const context = useContext(RecipeContext);

    // wywalenie błędu wrazie jakby context był użyty poza providerem
    if (!context) {
        throw new Error("used outside of the provider");
    }

    return context
}