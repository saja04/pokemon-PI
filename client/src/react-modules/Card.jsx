import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from '../react-styles/Card.module.css'

const Card = ({pokemon}) => {

    const {id, name, image, types, origin} = pokemon;

    const navigate = useNavigate();
    const detailHandler = () => {
        navigate(`/detail/${id}`)
    }

    if(origin === 'api'){
        return(
            <div className={style.singleCard}>
            <NavLink to={`/detail/${id}`} onClick={detailHandler} className={style.cardNav}>
                <h1 className={style.cardName}>{name}</h1>
                <img src={image} alt={name} className={style.cardImage}></img>
                <h2 className={style.cardTypes}>{types.map(type => {
                    return <p className={style.cardType}>{type}</p>
                })}</h2>
            </NavLink>
        </div>
        )
    } else if( origin === 'db' ){
        return(
            <div className={style.cardDb}>
            <NavLink to={`/detail/${id}`} onClick={detailHandler} className={style.cardNav}>
                <h1 className={style.cardName}>{name}</h1>
                <img src={image} alt={name} className={style.cardImage}></img>
                <h2 className={style.cardTypes}>{types.map(type => {
                    return <span className={style.cardType}>{type}</span>
                })}</h2>
            </NavLink>
        </div>
        )
    }

    return(
        <div className={style.singleCard}>
            <NavLink to={`/detail/${id}`} onClick={detailHandler} className={style.cardNav}>
                <h1 className={style.cardName}>Name: {name}</h1>
                <img src={image} alt={name} className={style.cardImage}></img>
                <h2 className={style.cardTypes}>Types: {types.map(type => {
                    return <p>{type}</p>
                })}</h2>
            </NavLink>
        </div>
    )
}
export default Card;