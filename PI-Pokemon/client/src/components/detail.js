import React from "react";
import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, getClean} from "../actions/index";

export default function Detail() {

    
    
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
        <div>
            {myPokemon.length > 0 ? 
                <div>
            <h1>Name: {myPokemon[0].name}</h1>
            <img src={myPokemon[0].sprites} />
                <h2>ID:{myPokemon[0].id}</h2>
                <h3>Life:{myPokemon[0].hp}</h3>
                <h3>Strength:{myPokemon[0].strength}</h3>
                <h3>Defense: {myPokemon[0].defense}</h3>
                <h3>Speed:{myPokemon[0].speed}</h3>
                <h3>Height:{myPokemon[0].height}</h3>
                <h3>Weight:{myPokemon[0].weight}</h3>
                <h3>Types:  </h3>
                </div> : <h1>Loading...</h1>}
        </div>
    );
}