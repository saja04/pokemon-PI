import React, { useState } from "react";
import { searchPokemon } from "../redux/actions";
import { connect } from "react-redux";
import style from "../react-styles/SearchBar.module.css";

const SearchBar = ({ pokemons, searchedPokemon, searchPokemon }) => {
  const [pokemonName, setPokemonName] = useState("");

  const changeHandler = (event) => {
    setPokemonName(event.target.value);
  };

  return (
    <div className={style.mainDivSearchBar}>
      <input
        type="search"
        value={pokemonName}
        onChange={changeHandler}
        className={style.input1}
      ></input>
      <button
        onClick={async () => {
          if(!pokemonName){
            return
          } else
          await searchPokemon(pokemonName);
        }}
        className={style.submit}
      >
        GO!
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
    searchedPokemon: state.searchedPokemon,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchPokemon: (name) => {
      dispatch(searchPokemon(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
