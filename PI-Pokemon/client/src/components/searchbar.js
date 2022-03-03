import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNamePokemons, getPokemons, getPokemonStrength } from "../actions";
import { useSelector } from "react-redux"
import './searchbar.css';
import { Link } from "react-router-dom";

export default function SearchBar(props) {
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    // eslint-disable-next-line
    const [orden, setOrder] = useState("");

    const [currentPage, setCurrentPage] = useState(1)

    
    
    const [name, setName] = useState("");
    const [search, setSearch] = React.useState("")
    const [ strength, setStrength] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        dispatch(getPokemons())
        setStrength(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(allPokemons)

        props.onSearch(strength);
   
        /* 
        let data = getPokemons(strength);
        if (data > 0) {
            alert("Pokemon not found");
        } else {
            dispatch(e);
        } */
    }
    
  /*   const handleOnSearch = () => {
        onSearch(search);
        setSearch("");
    } */

    return (
        <div className="formbar">
             <Link to="/home">
                <button className="buttonSearch" >
                    Refresh
                </button>
                </Link>
            <input
            className="inputSearch"
            value={strength}
            type="number"
            placeholder="Type a pokemon name"
            autoComplete="off"
            onChange={(e) => handleInputChange(e)}
            /* onKeyPress={(e) => {
                if (e.key === "Enter") handleOnSearch();
              }} */
            />
            <button
            className="buttonSearch"
            onClick={(e) => handleSubmit(e)}
            type="submit"
            >
                Search
            </button>
            <Link to="/add">
            <button className="buttonSearch">
                Add New Pokemon
            </button>
            </Link>
            
     </div>
    )
}