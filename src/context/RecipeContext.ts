import { createContext } from "react";

export type Recipe = {
    name: string;
    category: string;
    cuisine: string;
    ingredients: string[];
    image: string;
    instructions: string;
}

type RecipeContextResult = {
    recipes: Recipe[],
    addRecipe: (recipe: Recipe) => void;
} | null

export const RecipeContext = createContext<RecipeContextResult>(null);