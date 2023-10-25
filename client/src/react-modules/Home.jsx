import React from "react";
import Cards from "./Cards";
import NavBar from "./NavBar";
import style from "../react-styles/Home.module.css";

const Home = () => {
  return (
    <div className={style.mainDiv}>

      <div className={style.navContainer}>
        <NavBar />
      </div>

      <div className={style.cardsContainer}>
        <Cards />
      </div>

    </div>
  );
};

export default Home;
