import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postPokemones, getTypes} from "../actions/index";


function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "El nombre es requerido";
    } else if (!input.hp) {
        errors.hp = "El nivel de vida es requerido";
    } 
    return errors;
};

   



export default function Add(){
    const dispatch = useDispatch();
    const allTypes = useSelector(state => state.types)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    console.log(allTypes)

    useEffect(() => {
        dispatch(getTypes());
    }, []);
    
    useEffect(() => {
        setErrors(validate(input));
    }, [])

    const [input, setInput] = useState({
        name: "",
        hp: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        sprites: "",
        types: [],
    });

const handleChange = (e) => { 
    setInput({
        ...input,
        [e.target.name]: e.target.value
    });
    console.log(input)
    setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
    }));
}

function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    if (!e.target.checked) {
      input.types.splice(input.types.indexOf(e.target.value), 1);
      setInput({
        ...input,
      });
    }
  }


  function handleSubmit(e){
      e.preventDefault();
        dispatch(postPokemones(input))
        alert("¡Pokemon creado!")
        setInput({
            name: "",
            hp: "",
            strength: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            sprites: "",
            types: [], 
        })
       navigate("/home")
  }



    return(
        <div>
            <h1></h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                    type="text" 
                    value={input.name} 
                    name="name"
                    onChange={handleChange} 
                    placeholder="Name"
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>Life:</label>
                    <input 
                    type="text" 
                    value={input.hp}
                    name="hp"
                    onChange={handleChange}
                    placeholder="Life"
                     />
                     {errors.hp && <p>{errors.hp}</p>}
                </div>
                <div>
                    <label>Force:</label>
                    <input 
                    type="text" 
                    value={input.strength} 
                    name="strength"
                    onChange={handleChange} 
                    placeholder="Force"
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input 
                    type="text" 
                    value={input.defense} 
                    name="defense"
                    onChange={handleChange}
                    placeholder="Defense"
                     />
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    type="text" 
                    value={input.speed} 
                    name="speed"
                    onChange={handleChange}
                    placeholder="Speed"
                     />
                </div>
                <div>
                    <label>Heigth:</label>
                    <input
                    type="text"
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    placeholder="Heigth"
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    type="text"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    placeholder="Weight"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text"
                    value={input.sprites} 
                    name="sprites"
                    onChange={handleChange}
                    placeholder="Url image jpg"
                     />
                </div>
                <div>
                    <label>Types:</label>
                {allTypes?.map((type) =>{
                    return (
                        <div key={type.name}>
                            
                                {(type.name)}
                            
                            <input 
                            type="checkbox" 
                            value={type.name} 
                            name={type.name}
                            onClick={handleCheck} 
                            />
                        </div>
                    )
                })}
                {input.types.length > 2 ? (
                    <p>Seleccione Máximo 2 Tipos</p>
                ): null}

                </div>
                <div>
                    <button 
                    type="submit"
                    >Submit</button>
                </div>
            </form>
        </div>
    )
}