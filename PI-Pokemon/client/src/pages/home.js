import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, 
    getTypes, 
    filterCreated, 
    filterName, 
    getPokemonStrength,
    orderByStrength,
    filterByType   } from "../actions"
import Card from "../components/card"
import Paginado from "../components/paginado"
import SearchBar from "../components/searchbar"
import OtroSearch from "../components/otrosearch"
import './home.css'
import Loader from "../components/loader"

export default function Home () {
const dispatch = useDispatch()
const allPokemons = useSelector(state => state.pokemons)
const loadPokemon  = useSelector(state => state.loadPokemon)

const [currentPage, setCurrentPage] = useState(1) //mipagina actual que arranca en 1
const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //mis personajes por pagina
const indexOfLastPokemon = currentPage * pokemonsPerPage //indice del ultimo personaje
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage //indice del primer personaje menos la cantidad de personajes por pagina
const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon) //toma el indice del primero y del último de cada página, o sea si mi página termina en 12 la siguiente comienza en 13 y termina en 24, se modifica dependiendo de la página en la que estoy
const [pokemonPage, setPokemontPage] = useState(allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)) //mipagina actual que arranca en 1
//const [currentPokemons1,setCurrentPoke  ] = useState(allPokemons)
const [list, setList] = useState([]) 
const [haslist, setHasList] = useState(false) 


const allTypes = useSelector(state => state.types)


// eslint-disable-next-line
const [orden, setOrder] = useState("");
const [ strength, setStrength] = useState("")

const [search, setSearch] = React.useState("")



const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
}

useEffect(() => {
    dispatch(getPokemons())
    console.log(currentPokemons)
    dispatch(getTypes())

    //setCurrentPoke(allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon))
},[dispatch])

function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemons())
    dispatch(getTypes())
}

function test(e) {
    e.preventDefault()
    console.log(strength)
    let data = getPokemonStrength(strength)
    console.log("ggggggggggggggggggggg",data)

    dispatch(data)
    //setCurrentPage(1)
}

function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
    setHasList(false)
}

function handleFilterType(e) {
    dispatch(filterByType(e.target.value))
    setCurrentPage(1)
    setHasList(false)
}

function handleSortName (e) {
    e.preventDefault()
    let data = filterName(e.target.value)
    console.log(data)
    dispatch(data)
    setCurrentPage(1)
    setOrder(e.target.value);
    setHasList(false)
}

function handleSortStrength (e) {
    e.preventDefault()
    dispatch(orderByStrength(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value);
    setHasList(false)
}

function handleInputChange(e) {
    e.preventDefault();
    setStrength(e.target.value);
    setHasList(false)
}

function upDate(e) {
    var allPokemonsAux = []
    allPokemons.forEach(pokemones => {
        
        if(pokemones.strength === Number.parseInt(strength) ){
            console.log(pokemones.strength, strength)
            allPokemonsAux.push(pokemones)
        }
    });

    console.log(allPokemonsAux)
    setList(allPokemonsAux)
    setHasList(true)
    //currentPokemons = allPokemonsAux
}
 
if (loadPokemon.length === 0) {
    return (
        <div className="loader">
            <Loader />
        </div>
    )
} else {
    return (
        <div className="fondo">
        <div>
           
        <div className="">
                <SearchBar
                   // onSearch={upDate}
                />
                <div className="pokemonContainer">
            </div>
            <div>
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
            onClick={(e) => upDate(e)}
            type="submit"
            >
                Search
            </button>
            </div>
            <div className="alinear">
                <select className="seleccionador" onChange={(e) => handleSortName(e)}>
                    <option value="All"> Sort by Name</option>
                    <option value='asc'>Ascending order</option>
                    <option value='des'>Descending order</option>
                </select>
                <select className="seleccionador" onChange={(e) => handleSortStrength(e)}>
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
                </select>
            </div>
            <div>
                <OtroSearch />
            </div>
            <div className="pokemonsContainer">
            <div>
                <Paginado //renderizamos páginado
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
            </div>
            <div className="gridHome">
                
                {currentPokemons.length > 0 && !haslist &&
                    currentPokemons?.map((c) => {
                    return (
                       <div>

                           { c.name != "" &&
                            <Card
                                key={c.id}
                                name={c.name}
                                sprites={c.sprites}
                                strength={c.strength}
                                types={c.types}
                                id={c.id}
                            />
                           }
                           {c.name === undefined &&
                            <h1 className="notfound">Pokemons not found</h1>
                           } 
                     
                       </div>
                        
                    )
                })}

                {
                    haslist &&
                    
                    list.map((c) => {
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
                    })
                }
                {currentPokemons.length === 0 &&
                
                    <h1 className="notfound">Pokemons not found</h1>
                }
                        
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}
}