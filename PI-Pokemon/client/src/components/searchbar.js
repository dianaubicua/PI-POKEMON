import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import { useSelector } from "react-redux"
import './searchbar.css';
import { Link } from "react-router-dom";
import {  
    filterCreated, 
    filterName, 
    orderByStrength,
    filterByType   } from "../actions"

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const allTypes = useSelector(state => state.types)
    // eslint-disable-next-line
    const [orden, setOrder] = useState("");

    const [currentPage, setCurrentPage] = useState(1)


    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }
    
    function handleFilterType(e) {
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }
    
    function handleSortName (e) {
        e.preventDefault()
        dispatch(filterName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value);
    }
    
    function handleSortStrength (e) {
        e.preventDefault()
        dispatch(orderByStrength(e.target.value))
        setCurrentPage(1)
    }    

    
    
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
            {/* <div className="">
                <select className="seleccionador" onChange={(e) => handleSortName(e)}>
                    <option value="All"> Sort by Name</option>
                    <option value='asc'>Ascending order</option>
                    <option value='des'>Descending order</option>
                </select>
                <select  className="seleccionador" onChange={(e) => handleSortStrength(e)}>
                    <option value='All'>Sort by Strength</option>
                    <option value='ASCE'>Ascending order</option>
                    <option value='DESC'>Descending order</option>
                </select>

                <select className="seleccionador" onChange={e => handleFilterType(e)}>
                    <option value="all" >Sort by Type</option>
                    {
                        allTypes?.map(type => {
                        return (<option key={type.name} value={type.name}>{type.name}</option>)
                    })}
                </select>

                <select className="seleccionador" onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Sort by Origin</option>
                    <option value='created'>Created</option>
                    <option value='api'>Internet</option>
                </select> */}
            
     </div>
    )
}