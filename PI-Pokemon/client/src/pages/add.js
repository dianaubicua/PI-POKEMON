import React from "react";
import { Link } from "react-router-dom"
import Formulario from "../components/formulario";

export default function Add() {
    return(
        <div>
            <div>
                <h1>Add Pokemon</h1>
                <div>
                    <Link to="/home">
                    <button>Return to Home</button>
                    </Link>
                </div>
            </div>
            <Formulario />
        </div>
    )
}