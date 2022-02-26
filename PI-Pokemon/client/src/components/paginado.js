import React from 'react';
import './paginado.css';

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);//el número que resulta de dividir la cantidad de personajes por la cantidad de personajes por página
    }
    
    return(
        <nav className='containerPag'>
            <div className='ul'>
            <p className='li'>
            { pageNumbers &&
                pageNumbers.map(number =>
                    <span  className='libtn' key={number}
                          onClick={() => paginado(number)}>{number}
                    </span>
           )}
            </p>
            </div>
        </nav>
    )
}