import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons } from "../actions"
import Card from "../components/card"
import { Link } from "react-router-dom"
import Paginado from "../components/paginado"

export default function Home () {
const dispatch = useDispatch()
const allPokemons = useSelector(state => state.pokemons)
const [currentPage, setCurrentPage] = useState(1) //mipagina actual que arranca en 1
const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //mis personajes por pagina
const indexOfLastPokemon = currentPage * pokemonsPerPage //indice del ultimo personaje
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //indice del primer personaje menos la cantidad de personajes por pagina
const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) //toma el indice del primero y del último de cada página, o sea si mi página termina en 12 la siguiente comienza en 13 y termina en 24, se modifica dependiendo de la página en la que estoy


const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getPokemons())
},[])

function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemons())
}




    return (
        <div>
            <div>
                <h1>Pueblo Paleta</h1>
                <Link to='/add'>Crear Pokemon</Link>
                <button onClick={e=> {handleClick(e)}}>
                    Volver a cargar los pokemones
                </button>
            </div>
            <div>
                <select>
                    <option value='All'>Sort by Name</option>
                    <option value='asc'>Ascending order</option>
                    <option value='des'>Descending order</option>
                </select>
                <select>
                    <option value='All'>Sort by Force</option>
                    <option value='ASCE'>Ascending order</option>
                    <option value='DESC'>Descending order</option>
                </select>
                <select>
                    <option>Sort by Type</option>
                </select>
                <select>
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