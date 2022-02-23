import React from 'react';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);//el número que resulta de dividir la cantidad de personajes por la cantidad de personajes por página
    }
    
    return(
        <nav>
            <ul>
            { pageNumbers &&
                pageNumbers.map(number =>
                    <li  key={number}>
                        <button  onClick={() => paginado(number)}>{number}</button>
                    </li>
           )}
            </ul>
        </nav>
    )
}