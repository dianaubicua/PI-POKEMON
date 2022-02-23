import React from "react";
import { Link } from "react-router-dom"


export const Landing = () => {
    return(
        <div >
            <div>
                <h1>Bienvenido a la aplicación de Pokemon</h1>
            </div>
            <div>
                <Link to="/home">
                    <button>Ir a la página principal</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;