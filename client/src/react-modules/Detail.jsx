import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import style from "../react-styles/Detail.module.css";
import attackImage from "../resources/images/ATTACK.png";
import hpImg from "../resources/images/HP.png";
import defenseImg from '../resources/images/DEFENSE.png'
import speedImg from '../resources/images/SPEED.png'
import heightImg from '../resources/images/HEIGHT.png'
import weightImg from '../resources/images/WEIGHT.png'

const Detail = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState([]);
  const getPokemonById = async () => {
    const response = await axios(`http://localhost:3001/pokemon/${id}`);
    const data = response.data.pokemon;
    setPokemon(data);
  };
  useEffect(() => {
    getPokemonById();
  }, []);

  const { name, image, life, attack, defense, speed, height, weight, types } =
    pokemon;
  let defTypes = null;
  const joinedTypes = () => {
    if (types) {
      console.log(types.length);
      if (types.length === 1) {
        defTypes = types;
      } else if (types.length > 1) {
        defTypes = types.join(", ");
      }
    }
  };
  joinedTypes();
  return (
    <div>
      <NavBar />
      <div className={style.detailMainDiv}>
        <NavLink to='/home' className={style.backHomeDetail}>{" < Back Home"}</NavLink>
        <div className={style.firstParams}>
          <h1 className={style.detailName}>Name: {name}</h1>
          <img src={image} alt={name} className={style.detailImage}/>
          <h2 className={style.detailTypes}> Types: {defTypes}</h2>
        </div>

        <div className={style.detailStats}>
          <img src={hpImg} alt="life" className={style.statsImages}/>
          <h2 className={style.statsTitle}>HP: {life}</h2>

          <img src={attackImage} alt="attack" className={style.statsImages}/>
          <h2 className={style.statsTitle}>Attack: {attack}</h2>

          <img src={defenseImg} alt="defense" className={style.statsImages}/>
          <h2 className={style.statsTitle}>Defense: {defense}</h2>

          <img src={speedImg} alt="speed" className={style.statsImages}/>
          <h2 className={style.statsTitle}>Speed: {speed}</h2>

          <img src={heightImg} alt="height" className={style.statsImages}/>
          <h2 className={style.statsTitle}>Height: {height}</h2>

          <img src={weightImg} alt="weight" className={style.statsImages}/>
          <h2 className={style.statsTitle}>Weight: {weight}</h2>


        </div>
      </div>
    </div>
  );
};

export default Detail;
