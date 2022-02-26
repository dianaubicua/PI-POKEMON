import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postPokemones, getTypes} from "../actions/index";
import './formulario.css';
import pokebola from "../assets/pokebola.png";
import { Link } from "react-router-dom";


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
        <div className="containerForm">
            <form className="form" onSubmit={(e)=>handleSubmit(e)}>
                <section className="sectioncontainer">
                <div className="flexform">
                <div className="flexinputadd">
                    <label>Name:</label>
                    <input 
                    className="inputadd"
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
                    <input className="inputadd"
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
                    className="inputadd"
                    type="text" 
                    value={input.strength} 
                    name="strength"
                    onChange={handleChange} 
                    placeholder="Force"
                    />
                    {errors.strength && <p>{errors.strength}</p>}
                </div>
                <div>
                    <label>Defense:</label>
                    <input 
                    className="inputadd"
                    type="text" 
                    value={input.defense} 
                    name="defense"
                    onChange={handleChange}
                    placeholder="Defense"
                     />
                     {errors.defense && <p>{errors.defense}</p>}
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    className="inputadd"
                    type="text" 
                    value={input.speed} 
                    name="speed"
                    onChange={handleChange}
                    placeholder="Speed"
                     />
                        {errors.speed && <p>{errors.speed}</p>}
                </div>
                <div>
                    <label>Heigth:</label>
                    <input
                    className="inputadd"
                    type="text"
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    placeholder="Heigth"
                    />
                    {errors.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    className="inputadd"
                    type="text"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    placeholder="Weight"
                    />
                    {errors.weight && <p>{errors.weight}</p>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    className="inputadd"
                    type="text"
                    value={input.sprites} 
                    name="sprites"
                    onChange={handleChange}
                    placeholder="Url image jpg"
                     />
                </div>
                <div>
                <label style={{ fontWeight: "bold" }}>Types:</label>
                <div className="checkcontainer">
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
                </div>
                <div>
                    <button 
                    type="submit"
                    className="btnsend"
                    >Submit</button>
                </div>
                </div>
                </section>
            </form>
        </div>
    )
}