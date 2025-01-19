import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import chefAnimation from "../assets/chefAnimation.json";

export const HomePage = () => {
  return (
    <div className="bg-[#f8f3e7] bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeatmin-h-screen">
      <div
        className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-8 gap-12"
        style={{
          boxShadow: "0 15px 30px rgba(0, 0, 0, 1)",
        }}
      >
        <div className="text-center lg:text-left space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-6xl font-bold text-[#8b4513] mb-6">Cook Book</h1>
          <p className="text-lg text-gray-600">
            Pai Projekt
          </p>

          <Link
            to="/recipes"
            className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-white bg-[#8b4513] rounded-lg shadow hover:bg-[#6f3610] transition-transform transform hover:-translate-y-1"
          >
            Recipes
          </Link>

          <Link
            to="/favs"
            className="inline-block mt-4 px-6 py-3 text-xl font-semibold text-white bg-[#8b4513] rounded-lg shadow hover:bg-[#6f3610] transition-transform transform hover:-translate-y-1 ml-5"
          >
            Favorites
          </Link>
          
          <div className="w-80 lg:w-[30rem]">
            <Lottie animationData={chefAnimation} loop autoplay />
          </div>
        </div>
      </div>
    </div>
  );
};
