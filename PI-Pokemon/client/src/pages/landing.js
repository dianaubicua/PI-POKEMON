import React from "react";
import { Link } from "react-router-dom"
import pokebola from "../assets/pokebola.png"
import './landing.css'


export const Landing = () => {
    return(
        <div className="backgroundLanding">
            <div className="grid">
            <h1 className="title"> My PokeWiki</h1>
                <div>
                    <img src={pokebola} alt="pokebola" className="imgwiki"></img>
                </div>
                <div>
                    
                </div>
                <div className="btncontainer">
                    <Link to="/home" >
                        <button className="btn">Pokemon GO!</button>
                    </Link>
                </div>
            </div>
        </div>
    ) 
}

export default Landing;