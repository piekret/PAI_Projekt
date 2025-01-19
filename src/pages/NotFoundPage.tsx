import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../components/Animation - 1737015831636.json";

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div 
            className="flex items-center justify-center min-h-screen 
            bg-[#f8f3e7] bg-[url('https://www.interregeurope.eu/sites/default/files/news/Wood.jpg')] bg-cover bg-center bg-no-repeat"
            style={{
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
            }}
        >
            <div 
                className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto"

            >
                <Player
                    autoplay
                    loop
                    src={animationData}
                    className="w-72 h-72 mx-auto mb-6"
                />
                <h1 className="text-4xl font-bold text-[#8b4513] mb-4">Page Not Found</h1>
                <p className="text-lg text-gray-700 mb-6">
                    It seems the address you entered is incorrect.
                </p>
                <button
                    onClick={goHome}
                    className="px-6 py-3 text-lg font-medium bg-[#8b4513] text-white rounded-lg shadow-md hover:bg-[#6f3610] transition-transform transform hover:-translate-y-1"
                >
                    Go to Home Page
                </button>
            </div>
        </div>
    );
};
