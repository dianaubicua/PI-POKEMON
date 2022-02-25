import React from "react";
import { Link } from "react-router-dom"
import './landing.css'


export const Landing = () => {
    return(
        <div >
            <div>
                <div>
                    <h1>Bienvenido a la aplicación de Pokemon</h1>
                  <div>
                    <Link to="/home">
                        <button>Ir a la página principal</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;