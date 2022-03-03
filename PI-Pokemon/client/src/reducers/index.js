const initialState = {
    pokemons: [], //estado actual de los pokemons
    pokemonsCopy: [], //opia del estado original siempre va a tener todos los pokemon del api y bd
    allPokemons: [], //todos los pokemons del api
    loadPokemon: [], //pokemon que se esta cargando
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
                allPokemons: action.payload,
                loadPokemon: action.payload
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
            const misPokes = state.pokemonsCopy;
            const typesFiltered = action.payload === 'all' ? misPokes :
             misPokes.filter(p => {
                 if(typeof p.types[0] !== 'string'){
                     p.types = p.types.map(t => t.name)     
             } else {
                 p.types = p.types
             } 
             return p.types.includes(action.payload)
            })
            return {
                ...state,
                pokemons: typesFiltered,
            }

        case 'FILTER_CREATED': 
        const todosPokemons = state.pokemonsCopy;
        const createdFilter = action.payload === 'created' ? todosPokemons.filter(el => el.createdInDb)  : 
        todosPokemons.filter (el => !el.createdInDb)
        console.log(createdFilter);
            return {
                ...state,
                pokemons: action.payload === 'All' ? todosPokemons : createdFilter
            }

        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: [action.payload]
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
