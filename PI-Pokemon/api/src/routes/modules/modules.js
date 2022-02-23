const { getPokemonData } = require('../../utils/getPokemonData');
const { Pokemon, Tipos } = require('../../db.js');
const { getTiposNames } = require('../../utils/getTiposNames');
const axios = require('axios');

async function getApiInfo() {
    //trayendo info de la api
    const dataApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40'); //limitando a 40 pokemon
    const pokemones = dataApi.data.results; //creando un array con los resultados de la api
    console.log(pokemones)
    const pokemonsData = await Promise.all( //creando un array con los datos de cada pokemon
        pokemones.map((pokemon) => axios.get(pokemon.url)) //array de promesas
    ); 
    let arraydePokemones = []; //array auxiliar donde se guardaran los datos de cada pokemon
    data.forEach((pokemon) => { //recorriendo el array de promesas}
        arraydePokemones.push({  //agregando los datos de cada pokemon al array auxiliar
            ...getPokemonData(pokemon) ///obtenemos la data y la guardamos en el array de pokemones
        });
    })
    return arraydePokemones;
    }


async function getDbInfo() {
    let arrayDePokemonesDb = [];
    arrayDePokemonesDb = await Pokemon.findAll({
        include: {
            model: Tipos, //incluimos la tabla tipos
            attributes: ['nombre'], //obtenemos los datos de la tabla tipos
            through: { 
                attributes: [], //comprobacion 
            }, 
        }
    });
    arrayDePokemonesDb = arrayDePokemonesDb.map((e) => {
        return { ...e.dataValues, types: getTiposNames(e.dataValues) };     
    });
    return arrayDePokemonesDb.reverse();
}

module.exports = { getApiInfo, getDbInfo };