import React from "react";
import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, getClean} from "../actions/index";
import { Link } from "react-router-dom";
import pokebola from "../assets/pokebola.png";
import Loader from "./loader"
import './detail.css'

export default function Detail() {

    const loader = useSelector((state) => state.loader);
    
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch]);

  /*   useEffect(() => {
        dispatch(getClean());
    }, [id])  */ 

    const myPokemon = useSelector((state) => state.pokemonDetail);
    console.log(myPokemon, "AQUI!!!!");

    return (
        <div className="detailContainer">
            <Link to="/home" className="linkd">
                <div className="wikiimg">
                    <div>
                        <img className="pokebolita" src={pokebola}></img>
                    </div>
                        <p>Back</p>
                </div>
            </Link>

            {myPokemon.length > 0 ? (
                <div className="details">
            <h1 className="pokename">{myPokemon[0].name}</h1>
            <img className="imgpoke" src={myPokemon[0].sprites} />
                <p className="data">ID: <span>{myPokemon[0].id}</span> </p>
                <p className="data">Life: {myPokemon[0].hp}</p>
                <p className="data">Strength: {myPokemon[0].strength}</p>
                <p className="data">Defense: {myPokemon[0].defense}</p>
                <p className="data">Speed: {myPokemon[0].speed}</p>
                <p className="data">Height: {myPokemon[0].height}</p>
                <p className="data">Weight: {myPokemon[0].weight}</p>
                <h3 className="data">Types: {myPokemon[0].types?.map(t => t).join(", ")}  </h3>
                </div> 
                ) : loader ? (
                    <Loader />
                ) : null}
        </div>
    );
}