function getPokemonFront (props) {
    return {
        name: auxD.data.name,
        sprites: auxD.data.sprites.front_default,
        types: auxD.data.types.map((e) => e.type.name),
};
}

module.exports = {getPokemonFront} ;