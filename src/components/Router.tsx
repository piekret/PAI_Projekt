import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from '../constants/links'
import { HomePage } from "../pages/HomePage";
import { RecipeList } from "../pages/RecipeList";

const router = createBrowserRouter([
    {
        path: Links.HOMEPAGE,
        element: <HomePage />
    },
    {
        path: Links.RECIPES,
        element: <RecipeList />
    }
])

export const Router = () => {
    return <RouterProvider router={router}/>
}