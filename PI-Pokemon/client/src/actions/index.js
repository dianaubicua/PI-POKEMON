import axios from 'axios';

export const getPokemons = () => { //conexión con el back
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/pokemons', {
        });
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const typesPokemons = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: 'GET_TYPES',
                payload: typesPokemons.data
            })
         } catch (error) {
             console.log(error);
         }
    }
}

/* {
    var json = await axios.get('http://localhost:3001/types', {
    });
    return dispatch({
        type: 'GET_TYPES',
        payload: json.data
    }) */


export function postPokemones(payload) {
    return async function (dispatch) {
       const response = await axios.post('http://localhost:3001/pokemons',    payload);
       console.log(response);
       return response;
}
}

export function filterByType(payload){
    console.log(payload);
    return{
        type: 'FILTER_BY_TYPE',
        payload,
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload: payload,
    }
}

export function filterName(payload){
    return {
        type: 'FILTER_NAME',
        payload
    }
}

export function orderByStrength(payload) {
    return {
        type: 'ORDER_BY_STRENGTH',
        payload
    }

}

export function getPokemonStrength(payload) {
    
}

export function getNamePokemons(name){
    return async function (dispatch){
        console.log(name);
        try{
            const pokemonName = await axios.get("http://localhost:3001/pokemons/?name=" + name)
            console.log(pokemonName);
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: pokemonName.data
            })
        }catch(error){
        console.log(error);
    }
}
}


export function getClean(){
    return {
        type: 'GET_CLEAN',
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/pokemons/" + id)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}



//EJEMPLO DE UNA FUNCIÓN EN PROMESAS

/* export function getPokemon() {
    return function(dispatch) {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=40&offset=0")
        .then(res => res.json())
        .then(pokes => dispatch({
            type: GET_POKEMONS, 
            payload: pokes
        }))
    }
}


} */


/* export function getNamePokemons(name){
    return async function (dispatch){
        console.log(name,"222222222222222222222222222222222");
        try{
            var pokemonName = await axios.get("http://localhost:3001/pokemons/?name=" + name)
            console.log(pokemonName);
            
        }catch(error){
        console.log(error);
    }
    finally{
        if (pokemonName) {
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: pokemonName.data
            })
        } else {
            return alert('Pokemon not found')
        }
    }
}
}
 */