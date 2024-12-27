import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from '../constants/links'
import { HomePage } from "../pages/HomePage";

const router = createBrowserRouter([
    {
        path: Links.HOMEPAGE,
        element: <HomePage />
    }
])

export const Router = () => {
    return <RouterProvider router={router}/>
}