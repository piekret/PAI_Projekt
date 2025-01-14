import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import chefAnimation from "../assets/chefAnimation.json";

export const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-8 gap-8">
        <div className="text-center lg:text-left space-y-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Cook Book</h1>
          <Link
            to="/recipes"
            className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-gray-700 bg-gray-200 shadow-md hover:bg-gray-300 transition-transform transform hover:translate-y-[-3px]">
            Recipes
          </Link>
        </div>

        <div className="w-72 lg:w-auto">
          <Lottie animationData={chefAnimation} loop autoplay />
        </div>
      </div>
    </div>
  )
};
