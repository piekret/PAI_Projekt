import { Link } from "react-router-dom"
import Lottie from "lottie-react"
import chefAnimation from "../assets/chefAnimation.json"
import "../styles/MainPage.css"

export const HomePage = () => {
    return (
        <div className="main-page">
            <div>
                <h1 className="title">Książka Kucharska</h1>
                <Link to="/recipes" className="link">Przepisy</Link>
            </div>
            <Lottie className="animation" animationData={chefAnimation} loop autoplay allowTransparency />
        </div>
    )
}