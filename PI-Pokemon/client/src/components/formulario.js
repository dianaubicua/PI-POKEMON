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
        errors.name = "Name is necessary";
    } 
    if(!input.hp) {
        errors.hp = "Life points is necessary";
    }
    if (!input.strength){
        errors.strength = "Strength points is necessary";
    }
    if (!input.defense){
        errors.defense = "Defense points is necessary";
    }
    if (!input.speed){
        errors.speed = "Speed points is necessary";
    }
    if (!input.height){
        errors.height = "Height points is necessary";
    }
    if (!input.weight){
        errors.weight = "Weight points is necessary";
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
        sprites: pokebola,
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
        <main>
        <div className="containerForm">
            <form className="form" onSubmit={(e)=>handleSubmit(e)}>
                <section className="sectioncontainer">
                <div className="flexform">
                <div>
                    <label>Name:</label>
                    <input 
                    className="inputadd"
                    type="text" 
                    value={input.name} 
                    name="name"
                    onChange={handleChange} 
                    placeholder="Name"
                    required
                    />
                    {errors.name && <p className="errormessage">{errors.name}</p>}
                </div>
                <div>
                    <label>Life:</label>
                    <input className="inputadd"
                    type="number" 
                    value={input.hp}
                    name="hp"
                    onChange={handleChange}
                    placeholder="Life"
                    min="0"
                    max="255"
                     />
                     {errors.hp && <p className="errormessage">{errors.hp}</p>}
                </div>
                <div>
                    <label>Force:</label>
                    <input 
                    className="inputadd"
                    type="number" 
                    value={input.strength} 
                    name="strength"
                    onChange={handleChange} 
                    placeholder="Force"
                    min="0"
                    max="255"
                    />
                    {errors.strength && <p className="errormessage">{errors.strength}</p>}
                </div>
                <div>
                    <label>Defense:</label>
                    <input 
                    className="inputadd"
                    type="number" 
                    value={input.defense} 
                    name="defense"
                    onChange={handleChange}
                    placeholder="Defense"
                    min="0"
                    max="255"

                     />
                     {errors.defense && <p className="errormessage">{errors.defense}</p>}
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                    className="inputadd"
                    type="number" 
                    value={input.speed} 
                    name="speed"
                    onChange={handleChange}
                    placeholder="Speed"
                    min="0"
                    max="255"
                     />
                        {errors.speed && <p className="errormessage">{errors.speed}</p>}
                </div>
                <div>
                    <label>Heigth:</label>
                    <input
                    className="inputadd"
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={handleChange}
                    placeholder="Heigth"
                    min="0"
                    max="255"
                    />
                    {errors.height && <p className="errormessage">{errors.height}</p>}
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    className="inputadd"
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={handleChange}
                    placeholder="Weight"
                    min="0"
                    max="255"
                    />
                    {errors.weight && <p className="errormessage">{errors.weight}</p>}
                </div>
                <div>
                    <label>Url image:</label>
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
                    <br/>
                <label style={{ fontWeight: "bold" }} className="espacio1">Types:</label>
                <br/>
                <div className="checkcontainer">
                {allTypes?.map((type) =>{
                    return (
                        <div key={type.name}>
                            
                                {(type.name)}
                            
                            <input 
                            className="checkbox"
                            type="checkbox" 
                            value={type.name} 
                            name={type.name}
                            onClick={handleCheck} 
                            />
                        </div>
                        
                    
                    )
                })}
                {input.types.length > 2 ? (
                    <p className="errormessage">Select Maximum 2 Types</p>
                ): null}
                </div>
                </div>
                <div>
                {
                    !errors.name && !errors.hp && !errors.strength && !errors.defense && !errors.speed && !errors.height && !errors.weight && input.types.length <= 2 ? 
                    <button 
                    type="submit"
                    className="btnsend"
                    >Submit</button>
                    : (<p>All fields must be filled out in order to register your pokemon</p>)
                }
                    
                </div>
                </div>
                </section>
                <br/>
            </form>
        </div>
        </main>
    )
}