import React from "react";
import style from '../react-styles/Landing.module.css'
import {NavLink} from 'react-router-dom'

const Landing = () => {
return(
    <div className={style.mainDivLanding}>
        <div>
            <h1 className={style.titleLanding}>The Pokedex: PokeAPI Consumption</h1>
        </div>
        <div className={style.buttonGoContainer}>
            <NavLink to='/home' className={style.buttonGo}>GO</NavLink>
        </div>
    </div>
)
}


export default Landing;