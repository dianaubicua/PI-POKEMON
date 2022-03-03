const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type} = require('../db.js');
const { getPokemon } = require('../utils/getPokemon');
const { getPokemonData } = require('../utils/getPokemonData');
const { getTiposNames } = require('../utils/getTiposNames');
const { getId } = require('../utils/getId');
const { getApiInfo, getDbInfo } = require('./modules/modules.js');
const {types} = require('./types.js');

const router = Router();

router.get('/', async (req, res) =>{
    const {name} = req.query;
    if (name) {
    try{
        if(!name) {
            const arrPokemonsDb = await getDbInfo();
            const arrPokemons = await getApiInfo();
            return res.send([...arrPokemonsDb, ...arrPokemons]);
        } else{
            //si llegó un name por query 
            const nameLower = name.trim().toLowerCase();
            //verifico que esté en la base de datos
            let pokemonDB = await Pokemon.findOne({
                where: {
                    name: nameLower,
                },
                include: Type,
            });
            if(pokemonDB) {
                pokemonDB = {
                    ...pokemonDB.dataValues,
                    types: getTiposNames(pokemonDB.dataValues),
                };
                return res.send(pokemonDB);
            }
            //si no está en la base de datos, busco en la api
            let pokemonAPI = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${nameLower}`
                );
            pokemonAPI = getPokemon(pokemonAPI);
            return res.send(pokemonAPI);
        }
    }
    catch(error){
        console.log("cualquier cosa");
        res.status(200).send([]);
    }
} else {

    const pokemonesFront = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40&offset=0');
    console.log(pokemonesFront);
    const pokemones = pokemonesFront.data.results.map(el =>{
        console.log(el);
        return   axios.get(el.url);
    });
    console.log("CUALQUIER COSA"); 
    console.log(pokemones);
    const pokemonesRender = await Promise.all(pokemones);
    const pokemonesRender2 = pokemonesRender.map(el =>{
        return {
            name: el.data.name,
            strength: el.data.stats[1].base_stat,
            sprites: el.data.sprites.front_default,
            types: el.data.types.map((e) => e.type.name),
            id: el.data.id,
        
        }
    });

  
    const infoDb = await Pokemon.findAll({include: Type});
    console.log(infoDb, "HOLAAAAAAAA");
    const pokemonesDb = infoDb.map(p => {
        return {
            name: p.name,
            sprites: p.sprites,
            types: p.types.map(e => e.name),
            strength: p.strength,
            id: p.id,
            speed: p.speed,
            hp: p.hp,
            defense: p.defense,
            createdInDb: p.createdInDb
        }
    });

    const allMyPokemons = pokemonesRender2.concat(pokemonesDb);
    res.status(200).send(allMyPokemons);
}
});


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        //primero vamos a buscar en la base de datos, 
        let pokemonDB = await Pokemon.findOne({ where: {id}, include: Type });
        pokemonDB = {...pokemonDB.dataValues, types: getTiposNames(pokemonDB)};
        return res.send(pokemonDB);
    } catch (error) {
        try {
            //si no está en la base de datos, busco en la api
            let pokemonAPI = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`
            );
            pokemonAPI = getPokemonData(pokemonAPI);
            return res.send(pokemonAPI);
        }
        catch(error){
            return res.status(400).send(error); //si el id no se encontró en ningún lado
        }
    }
});

router.post('/', async (req, res) => {
    let {
        name,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        types,
        sprites,
    } = req.body;
    //console.log(req.body);
    name = name.toLowerCase();
    let pokemonCreado = await Pokemon.create({
        name,
        hp,
        strength,
        defense,
        speed,
        height,
        weight,
        sprites,
    });
    //console.log(pokemonCreado);
    let typesBD = await Type.findAll({
        where: {name: types},   
    })
    pokemonCreado?.addType(typesBD);
    res.send('Pokemon creado');
    console.log(pokemonCreado, "!!!!!!");
})



// router.post('/', async (req, res) => {
//     let { name, hp, strength, defense, speed, height, weight, sprites,
//         type,
//     } = req.body; //recibo la info del body
//     console.log(req.body);
//     try{
//         if(name) {
//             if (!hp) hp=1;
//             if (!strength) strength=1;
//             if (!defense) defense=1;
//             if (!speed) speed=1;
//             if (!height) height=1;
//             if (!weight) weight=1;
//             if (!type) type=1;
//             //solo si recibo un nombre, voy a guardar el pokemon en la base de datos
//             const nameLower = name.trim().toLowerCase();
//             const pokemonCreado = await Pokemon.create({
//                 name: nameLower,
//                 hp,
//                 strength,
//                 defense,
//                 speed,
//                 height,
//                 weight,
//                 sprites,
//             });
//             const arrayId = await getId(types); //recibiendo el array de tipos 
//             await pokemonCreado.setTypes(arrayId); //agregando los tipos al pokemon
//             let pokemons = await Pokemon.findOne({
//                 where: {
//                     id: pokemonCreado.id, //buscando el pokemon por id
//                 },
//                 include: Type, //incluyendo los tipos
//             });
//             pokemons = {
//                 ...pokemons.dataValues,
//                 types: types(pokemons), //obtengo el array de tipos
//             };
//             return res.json(pokemons);
//         }
//         res.status(400).send('El nombre es requerido para crear un pokemon');
//     }
//     catch(error){
//         res.status(400).send(error, 'error al crear el registro');
//     }
// })

// router.post("/", async (req, res, next) => {
//     const { name, hp, strength, defense, speed, height, weight, sprites, types } =
//       req.body;
//     try {
//       await getAxios(`${urlBasePokeapi}/pokemon/${name}`);
//       return res.json({ msg: "Already exists" });
//     } catch (error) {}
//     try {
//       const [pokemon, created] = await Pokemon.findOrCreate({
//         where: { name },
//         defaults: {
//           name,
//           hp,
//           strength,
//           defense,
//           speed,
//           height,
//           weight,
//           sprites,
//         },
//       });
//       if (!created) {
//         res.json({ msg: "Already exists" });
//       } else {
//         await pokemon.setTypes(types); // setTypes recibe un array como parametro
//         res.json({ msg: "Pokemon created successfully" });
//       }
//     } catch (error) {
//       next(error);
//     }
//   });





module.exports = router;