const { Router } = require('express');
const axios = require('axios');
const { Type } = require('../db');
const router = Router();


// router.get('/', async (req, res) =>{
//   try {
//     const tipos = await axios.get('https://pokeapi.co/api/v2/type/');
//     let pokemonTipo = tipos.data.results
//     let psj = pokemonTipo.map(t =>{
//       return {
//         name: t.name,
//       }
//     })
//     const tiposPsj = await Type.bulkCreate(psj);
//     res.json(tiposPsj);
//   } catch (error) {
//     next (error);
//   }
// })

/* router.get("/", async (req, res, next) =>{
  let typesenDB = await Tipo.findAll()

  try {
      if(typesenDB.length === 0){
          let typesenAPI = await axios.get("https://pokeapi.co/api/v2/type")
          typesenAPI = typesenAPI.data.results.map( t => {return {name : t.name}})
          typesenDB = await Tipo.bulkCreate(typesenAPI)
       }
       res.send(typesenDB)

  } catch (error) {
      next(error)
  }
}) */


  router.get('/', async (req, res) => {
    let tipos = await axios.get('https://pokeapi.co/api/v2/type/');
    tipos = tipos.data.results;
    let tiposNames = [];

    for (let i = 0; i < tipos.length; i++) {
      tiposNames.push(tipos[i].name);
    }
    tiposNames.forEach(e =>{
      Type.findOrCreate({
        where: { name: e}
      })
    })

    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
  });
      

module.exports = router;