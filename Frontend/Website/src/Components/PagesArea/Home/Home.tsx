import "./Home.css";
import homeLogo from "../../../Assets/Images/homeLogo.png";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../../Utils/UseTitle";

export function Home() {

    useTitle("Home")
    
    const navigate = useNavigate();
    function handleSubmit(){
        navigate("/login");
    }
  return (
    <div className="home">
      <div className="home-content">
        <img src={homeLogo} className="home-logo" alt="Vacation Logo" />

        <h1>Live to Dream. Travel in style.</h1>

        <p>
          Our platform makes vacation planning simple and exciting.
          Browse destinations, compare options, save your favorite trips,
          and organize everything in one smart system.
          Whether you're dreaming of beaches, mountains, city breaks,
          or adventure travel — we help you turn ideas into real experiences.
        </p>
        <br></br>
        <button onClick={handleSubmit} className="btn-login">Explore Vacations Must Login</button>
      </div>
    </div>
  );
}