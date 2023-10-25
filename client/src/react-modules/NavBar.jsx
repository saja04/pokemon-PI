import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import style from "../react-styles/NavBar.module.css";

const NavBar = () => {


  return (
    <div className={style.navMainDiv}>
      <a href='/home' className={style.home}></a>
      <div className={style.searchBar}>
        <SearchBar />
      </div>

      <NavLink to="/create" className={style.create}>
        <button className={style.createButton}>Create</button>
      </NavLink>
    </div>
  );
};

export default NavBar;
