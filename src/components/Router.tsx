import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from '../constants/links';
import { HomePage } from "../pages/HomePage";
import { RecipeList } from "../pages/RecipeList";
import { RecipeItem } from "../pages/RecipeItem";
import { AddRecipe } from "../pages/AddRecipe";
import { NotFoundPage } from "../pages/NotFoundPage"; 
import { FavRecipes } from "../pages/FavRecipes";

const router = createBrowserRouter([
    {
        path: Links.HOMEPAGE,
        element: <HomePage />
    },
    {
        path: Links.RECIPES,
        element: <RecipeList />,
    },
    {
        path: `${Links.RECIPES}/:id`,
        element: <RecipeItem />
    },
    {
        path: Links.ADDRECIPE,
        element: <AddRecipe />
    },
    {
        path: "*", 
        element: <NotFoundPage />
    },
    {
        path: "/favs",
        element: <FavRecipes />
    }
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
