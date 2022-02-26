import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import './searchbar.css';
import { Link } from "react-router-dom";

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [search, setSearch] = React.useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
    }
    
    const handleOnSearch = () => {
        onSearch(search);
        setSearch("");
    }

    return (
        <div className="formbar">
             <Link to="/home">
                <button className="buttonSearch" >
                    Refresh
                </button>
                </Link>
            <input
            className="inputSearch"
            value={name}
            type="text"
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