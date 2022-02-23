import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import { useEffect } from "react";

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNamePokemons(name));
    }

    useEffect(() => {
        dispatch(getNamePokemons())
    },[dispatch])
    

    return (
        <div>
            <input
            type="text"
            placeholder="Type a pokemon name"
            onChange={(e) => handleInputChange(e)}
            />
            <button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            >
                Search
            </button>
        </div>
    )
}