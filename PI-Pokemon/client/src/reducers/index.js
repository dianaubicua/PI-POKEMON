const initialState = {
    pokemons: [], //estado actual de los pokemons
    pokemonsCopy: [], //opia del estado original siempre va a tener todos los pokemon del api y bd
    allPokemons: [], //todos los pokemons del api
    types: [], //guarda el arreglo de los tipos
    pokemonDetail: [], 
    filter: {
        name: 'All',
        type: 'All',
        strength: 'All',
        created: 'All'
    }
}

function filterByStrength(pokemons, payload) {
    let score = pokemons
    const orderScore = payload === "ASCE" ?
             score.sort(function(a, b){
                if (a.strength > b.strength) {
                    return -1
                   }
                if (b.strength > a.strength) {
                     return 1
                    }
                    return 0
        
            }) :
             score.sort(function(a, b){
                if (a.strength > b.strength) {
                    return 1
                   }
                if (b.strength > a.strength) {
                     return -1
                    }
                    return 0
            })
            return score
}


function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        case 'FILTER_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.pokemonsCopy.sort(function(a,b){
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                 return 0;
                }) :
            state.pokemonsCopy.sort (function(a,b){
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                })
        return {
            ...state,
            pokemonsCopy: sortedArr,
           
        }

        case 'ORDER_BY_STRENGTH':
            let score = filterByStrength(state.pokemons, action.payload)
            return {
                ...state,
                pokemonsCopy: score,
                filter: {
                    ...state.filter,
                    strength: action.payload
                }
            }
        case 'FILTER_BY_TYPE':
            const otraCosa = state.pokemons;
            console.log(otraCosa);
            const typesFiltered = action.payload === 'all' ? otraCosa : otraCosa.filter(p => p.types.includes(action.payload))
            console.log(typesFiltered);
                        return {
                ...state,
                
                pokemonsCopy: typesFiltered,

            }

        case 'FILTER_CREATED': 
        const createdFilter = action.payload === 'created' ? state.pokemons.filter(el => el.createdInDb)  : state.pokemons.filter (el => !el.createdInDb)
        console.log(createdFilter);
            return {
                ...state,
                pokemonsCopy: action.payload === 'All' ? state.pokemons : createdFilter
            }
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                pokemonDetail: [action.payload]
            }
        /* case 'GET_CLEAN':
            return {
                ...state,
                pokemonDetail: []
            } */
            default:
            return state;
    }
}



export default rootReducer;