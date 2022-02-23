import React from 'react';
/* import img from '../helpers/powerType' */
import { Link } from "react-router-dom"


export const Card = ({id, name, sprites, types, strength}) => {
    if(typeof types[0] !== "string"){
        types = types.map(t => t.name)
    } else {
        types = types 
    }


    return(
        <div>
            <Link to={'/detail/' + id}>
                <button>
                    <div>
                        <div>
                            <img src={sprites} 
                            alt={name} 
                            width="125px" 
                            heigt="125px" />
                            <h3>{name}</h3>
                        </div>
                        <div>
                            <h4>{strength}</h4>
                        </div>
                        <div>
                        <h5>Tipos: {types.join(", ")}</h5>
                            {/* {types?.map((type) => ( */}
                            {/* <img src={img[types]} alt={types} key={types}/>  */}
                            {/* ))} */}
                            
                        </div>              
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default Card;