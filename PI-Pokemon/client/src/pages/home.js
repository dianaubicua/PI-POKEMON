import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, 
    getTypes, 
    filterCreated, 
    filterName, 
    orderByStrength,
    filterByType   } from "../actions"
import Card from "../components/card"
import Paginado from "../components/paginado"
import SearchBar from "../components/searchbar"
import './home.css'

export default function Home () {
const dispatch = useDispatch()
const allPokemons = useSelector(state => state.pokemons)

const [currentPage, setCurrentPage] = useState(1) //mipagina actual que arranca en 1
const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //mis personajes por pagina
const indexOfLastPokemon = currentPage * pokemonsPerPage //indice del ultimo personaje
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //indice del primer personaje menos la cantidad de personajes por pagina
const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon) //toma el indice del primero y del último de cada página, o sea si mi página termina en 12 la siguiente comienza en 13 y termina en 24, se modifica dependiendo de la página en la que estoy

const allTypes = useSelector(state => state.types)


// eslint-disable-next-line
const [orden, setOrder] = useState("");


const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getPokemons())
    dispatch(getTypes())
},[dispatch])

function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemons())
}

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
    setOrder(e.target.value);
}
 


    return (
        <div className="backgroundHome">
            <div>
                <SearchBar />
            </div>
            <div>
                <select onChange={(e) => handleSortName(e)}>
                    <option > Sort by Name</option>
                    <option value='asc'>Ascending order</option>
                    <option value='des'>Descending order</option>
                </select>
                <select onChange={(e) => handleSortStrength(e)}>
                    <option value='All'>Sort by Strength</option>
                    <option value='ASCE'>Ascending order</option>
                    <option value='DESC'>Descending order</option>
                </select>

                <select onChange={e => handleFilterType(e)}>
                    <option value="all" >Sort by Type</option>
                    {
                        allTypes?.map(type => {
                        return (<option key={type.name} value={type.name}>{type.name}</option>)
                    })}
                </select>

                <select onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Sort by Origin</option>
                    <option value='created'>Created</option>
                    <option value='api'>Internet</option>
                </select>
            </div>
            <div>
                <Paginado //renderizamos páginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
            </div>
            <div>
                {currentPokemons?.map((c) => {
                    return (
                        <div>
                            <Card
                            key={c.id}
                            name={c.name}
                            sprites={c.sprites}
                            strength={c.strength}
                            types={c.types}
                            id={c.id}
                        />
                        </div>
                        
                    )
                })}
                        
            </div>
        </div>
    )
}