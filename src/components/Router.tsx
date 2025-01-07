import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from '../constants/links'
import { HomePage } from "../pages/HomePage";
import { RecipeList } from "../pages/RecipeList";
import { RecipeItem } from "../pages/RecipeItem";

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
    }
])

export const Router = () => {
    return <RouterProvider router={router}/>
}