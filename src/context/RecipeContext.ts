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
    favs: Record<string, string | string[] | number>[],
    addRecipe: (recipe: RecipeNoId) => void,
    addToFav: (recipe: Record<string, string | string[] | number>) => void, // typowane w taki sposob bo nie wiadomo czy przepis jest z api czy uzytkownika
    removeFromFav: (id: number) => void
} | null

// utworzenie contextu
export const RecipeContext = createContext<RecipeContextResult>(null);