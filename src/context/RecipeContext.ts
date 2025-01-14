import { createContext } from "react";

export type Recipe = {
    id: number
    name: string;
    category: string;
    cuisine: string;
    ingredients: string[];
    image: string;
    instructions: string;
}

export type RecipeNoId = Omit<Recipe, "id">

type RecipeContextResult = {
    recipes: Recipe[],
    addRecipe: (recipe: RecipeNoId) => void;
} | null

export const RecipeContext = createContext<RecipeContextResult>(null);