import React from "react";
import { Link } from "react-router-dom"
import Formulario from "../components/formulario";
import pokebola from "../assets/pokebola.png";
import './add.css'


export default function Add() {
    return(
        <div className="fondo">
            <div>
            <Link to="/home" className="linkd">
                <div className="wikiimg">
                    <div>
                        <img className="pokebolita" src={pokebola}></img>
                    </div>
                        <p>Back</p>
                </div>
            </Link>
            </div>
            <Formulario />
        </div>
    )
}