import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player"; 
import animationData from "../components/Animation - 1737015831636.json"; 

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate(); 

    const handleGoHome = () => {
        navigate("/"); 
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Player
                autoplay
                loop
                src={animationData}
                style={{ height: "300px", width: "300px" }}
            />
            <h1>Page Not Found</h1>
            <p>It seems the address you entered is incorrect.</p>
            <button
                onClick={handleGoHome}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#007BFF",
                    color: "white",
                }}
            >
                Go to Home Page
            </button>
        </div>
    );
};
