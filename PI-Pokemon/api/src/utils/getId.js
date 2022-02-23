const { Type } = require('../db');

async function getId(data) {
    var tipos = [];
    for (var i = 0; i < data.length; i++) {
        tipos.push(
            await Type.findOne({
                where: { name: data[i] }, //buscando los tipos depokemon por id y regresando el id en un array
                attributes: ['id'], //sólo regresamos el id
            })
        );
    }
    return tipos;
}

module.exports = { getId };