import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import style from "../react-styles/Create.module.css";

const Create = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState([]);

  const [input, setInput] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const getTypes = async () => {
      const response = await axios("http://localhost:3001/types/");
      const data = response.data;
      setTypes(data);
    };
    getTypes();
  }, []);

  const typesHandler = (type) => {
    if (selectedType.length === 3)
      return alert("limit of 3 types per pokemon!");
    else if (selectedType.includes(type.target.value)) {
      return alert("type already in use");
    }
    setSelectedType((prevTypes) => [...prevTypes, type.target.value]);
  };
  let typeId = [];
  const typeSearch = () => {
    types.map((type) => {
      selectedType.map((selected) => {
        if (selected === type.name) {
          typeId.push(type.id.toString());
        }
      });
    });
    const chain = typeId.join(", ");
    typeId = chain;
  };
  typeSearch();

  const validation = (input) => {
    let errors = {
      name: null,
      image: null,
      hp: null,
      attack: null,
      defense: null,
      speed: null,
      height: null,
      weight: null,
    };
    //name
    if (input.name.length < 3) {
      errors.name = "enter at least 3 characters";
    } else if (input.name.length > 30) {
      errors.name = "max characters";
    }
    //image
    else if (input.image.length > 5000) {
      errors.image = "max characters";
    }
    //hp
    // else if (!input.hp) {
    //   errors.hp = "enter health points";
    // }
    if (isNaN(input.hp)) {
      errors.hp = "enter number";
    } else if (input.hp.length > 20) {
      errors.hp = "max characters";
    }
    //attack
    // else if (!input.attack) {
    //   errors.attack = "enter attack points";
    // }
    if (isNaN(input.attack)) {
      errors.attack = "enter number";
    } else if (input.attack.length > 20) {
      errors.attack = "max characters";
    }
    //defense
    // else if (!input.defense) {
    //   errors.defense = "enter defense points";
    // }
    if (isNaN(input.defense)) {
      errors.defense = "enter number";
    } else if (input.defense.length > 20) {
      errors.defense = "max characters";
    }
    //speed
    // else if (!input.speed) {
    //   errors.speed = "enter speed points";
    // }
    if (isNaN(input.speed)) {
      errors.speed = "enter number";
    } else if (input.speed.length > 20) {
      errors.speed = "max characters";
    }
    //height
    // else if (!input.height) {
    //   errors.height = "enter height";
    // }
    if (isNaN(input.height)) {
      errors.height = "enter height";
    } else if (input.height.length > 20) {
      errors.height = "max characters";
    }
    //weight
    // else if (!input.weight) {
    //   errors.weight = "enter weight";
    // }
    if (isNaN(input.weight)) {
      errors.weight = "enter number";
    } else if (input.weight.length > 20) {
      errors.weight = "max characters";
    }
    return errors;
  };

  const [errors, setErrors] = useState({
    name: null,
    image: null,
    hp: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
  });

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !input.name ||
      !input.image ||
      !input.hp ||
      !input.attack ||
      !input.defense ||
      !input.speed ||
      !input.height ||
      !input.weight
    ) {
      return alert("Please, complete all camps");
    }
    if (selectedType.length === 0) {
      return alert("Please enter types!");
    } else
      try {
        const post = await axios.post("http://localhost:3001/pokemon/", {
          name: input.name,
          image: input.image,
          life: input.hp,
          attack: input.attack,
          defense: input.defense,
          speed: input.speed,
          height: input.height,
          weight: input.weight,
          typeId: typeId,
        });
        alert("pokemon created correctly!");
        return window.location.reload();
      } catch (error) {
        console.log(error.message);
        return alert(error.message);
      }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <NavBar />
      <NavLink to="/home" className={style.backHomeCreate}>
        {"< Back home"}
      </NavLink>
      {/* <h1>Create your pokemon!</h1>
      <NavLink to="/home">Back Home</NavLink> */}

      <form onSubmit={submitHandler}>
        <label>Pokemon name: </label>
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        ></input>
        <span>{errors.name}</span>
        <br />

        <label>Image URL: </label>
        <input
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
        ></input>
        <span>{errors.image}</span>
        <br />

        <label>Health points: </label>
        <input
          type="text"
          value={input.hp}
          name="hp"
          onChange={handleChange}
        ></input>
        <span>{errors.hp}</span>
        <br />

        <label>Attack points: </label>
        <input
          type="text"
          value={input.attack}
          name="attack"
          onChange={handleChange}
        ></input>
        <span>{errors.attack}</span>
        <br />

        <label>Defense points: </label>
        <input
          type="text"
          value={input.defense}
          name="defense"
          onChange={handleChange}
        ></input>
        <span>{errors.defense}</span>
        <br />

        <label>Speed points: </label>
        <input
          type="text"
          value={input.speed}
          name="speed"
          onChange={handleChange}
        ></input>
        <span>{errors.speed}</span>
        <br />

        <label>Height: </label>
        <input
          type="text"
          value={input.height}
          name="height"
          onChange={handleChange}
        ></input>
        <span>{errors.height}</span>
        <br />

        <label>Weight: </label>
        <input
          type="text"
          value={input.weight}
          name="weight"
          onChange={handleChange}
        ></input>
        <span>{errors.weight}</span>
        <br />

        <label>Types: </label>
        <select placeholder="Types" onChange={typesHandler}>
          {types.map((type) => {
            return <option value={type.name}>{type.name}</option>;
          })}
        </select>
        <span> (limit of 3)</span>
        <div className={style.selectedType}>
          {selectedType.map((type) => {
            return (
              <div className={style.indType}>
                <p>{type}</p>{" "}
                <button
                  type="button"
                  onClick={() => {
                    const newTypes = selectedType.filter((t) => t !== type);
                    setSelectedType(newTypes);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Create;
