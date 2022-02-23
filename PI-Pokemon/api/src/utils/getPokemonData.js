function getPokemonData (auxD) {
    return {
        id: auxD.data.id,
        name: auxD.data.name,
        hp: auxD.data.stats[0].base_stat,
        strength: auxD.data.stats[1].base_stat,
        defense: auxD.data.stats[1].base_stat,
        speed: auxD.data.stats[5].base_stat,
        height: auxD.data.height,
        weight: auxD.data.weight,
        sprites: auxD.data.sprites.front_default,
        types: auxD.data.types.map((e) => e.type.name),
};
}

module.exports = {getPokemonData} ;