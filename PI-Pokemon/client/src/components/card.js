import React from 'react';
 import img from '../helpers/powerType' 
import { Link } from "react-router-dom"
import './card.css'
import {useState} from 'react';

export const Card = ({id, name, sprites, types, strength}) => {
    console.log(types)
    const [empety, setEmpety] = useState(false);

    if(types === undefined) {
        setEmpety(true)
        types = []   
        /* alert("Pokemon not found") */
    }else
    {
        if(typeof types[0] !== "string"){
            types = types.map(t => t.name)
        } else {
            types = types 
        }
    
    }
    

    return(
        <div className='backgroundCard'>
            { types.length > 0 &&
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
                    <h5> {/* {types.join(", ")} */}</h5>
                         {types?.map((types) => (
                         <img src={img[types]} alt={types} key={types}/> 
                        ))} 
                    </div>              
                </div>
                </Link>
              
            }
             { types.length === 0 &&
                <h1>Pokemon no encontrado</h1>
             }
                
                </div> 
            
    )
}

export default Card;