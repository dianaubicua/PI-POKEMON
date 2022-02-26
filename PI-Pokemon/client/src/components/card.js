import React from 'react';
 import img from '../helpers/powerType' 
import { Link } from "react-router-dom"
import './card.css'


export const Card = ({id, name, sprites, types, strength}) => {
    if(typeof types[0] !== "string"){
        types = types.map(t => t.name)
    } else {
        types = types 
    }


    return(
        <div className='backgroundCard'>
                <Link to={'/detail/' + id} className="link">
                    <div className='gridCard'>
                        <div>
                            <h3 className='nameCard'>{name}</h3>
                            <img 
                            src={sprites} 
                            alt={name} 
                            width="150px" 
                            heigt="150px" />
                           
                        </div>
                        <div>
                            <h4>Strength: {strength}</h4>
                        </div>
                        <div>
                        <h5>Types: {/* {types.join(", ")} */}</h5>
                             {types?.map((types) => (
                             <img src={img[types]} alt={types} key={types}/> 
                            ))} 
                        </div>              
                    </div>
                    </Link>
                </div> 
            
    )
}

export default Card;