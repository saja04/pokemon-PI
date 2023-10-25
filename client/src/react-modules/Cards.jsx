import React from "react";
import Card from "./Card";
import style from "../react-styles/Cards.module.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterPokemonsOrigin,
  getPokemons,
  resetFilters,
  resetSearchedPokemon,

} from "../redux/actions";
import Filters from "./Filters";
import { NavLink } from "react-router-dom";

const Cards = ({
  pokemons,
  searchedPokemon,
  getPokemons,
  filtered,
  resetFilters,
  resetSearchedPokemon
}) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([...pokemons].splice(0, 12));

  useEffect(() => {
    if(!pokemons[0] && !filtered[0]){
      getPokemons();
    }
  }, []);

  useEffect(() => {
    setItems([...pokemons].splice(0, 12));
    setPage(1);
    
  }, [pokemons]);

  useEffect(() => {
    if (filtered[0]) {
      setItems([...filtered].splice(0, 12));
      setPage(1);
      
    } else {
      setItems([...pokemons].splice(0, 12));
      setPage(1);
      
    }
  }, [filtered]);
  // useEffect(() => {
  //   setItems([...filtered].splice(0, 12));
  // }, [filtered])
  const nextHandler = () => {
    if (items.length < 12) return;
    if (filtered[0] && filtered.length < 12) return;
    else if (filtered[0]) {
      const next = page + 1;
      setItems([...filtered].splice(next * 12 - 12, 12));
      setPage(next);
    } else {
      const next = page + 1;
      setItems([...pokemons].splice(next * 12 - 12, 12));
      setPage(next);
    }
    // }
  };

  const prevHandler = () => {
    if (pokemons.length <= 12) return;
    if (filtered[0] && filtered.length <= 12) return;
    const prev = page - 1;
    if (prev === 1 && filtered[0]) {
      setItems([...filtered].splice(0, 12));
      setPage(prev);
    } else if (prev >= 1 && filtered[0]) {
      setItems([...filtered].splice(prev * 12 - 12, 12));
      setPage(prev);
    } else if (prev === 1) {
      setItems([...pokemons].splice(0, 12));
      setPage(prev);
    } else if (prev >= 1) {
      setItems([...pokemons].splice(prev * 12 - 12, 12));
      setPage(prev);
    }
  };

  if (!pokemons[0]) {
    return (
      <div className={style.loadingDiv}>
        <img
          className={style.loading}
          src="https://fc03.deviantart.net/fs70/f/2013/019/b/6/pokeball_by_zel_duh-d5s04qj.gif"
          alt="loading_icon"
        ></img>
      </div>
    );
  }
  console.log(searchedPokemon);
  if (searchedPokemon) {
    if (searchedPokemon.pokemon && searchedPokemon.pokemon.origin === "api") {
      return (
        <div className={style.findedApi}>
          <button onClick={resetSearchedPokemon} className={style.backHomeCards}>{' < Back Home'}</button>
          <Card pokemon={searchedPokemon.pokemon} />
          
        </div>
      );
    } else if (
      searchedPokemon.pokemon &&
      searchedPokemon.pokemon.origin === "db"
    ) {
      return (
        <div className={style.findedDb}>
           <button onClick={resetSearchedPokemon} className={style.backHomeCards}>{' < Back Home'}</button>
          <Card pokemon={searchedPokemon.pokemon} />
        </div>
      );
    } else if (searchedPokemon.pokemons.origin === "api&db") {
      return searchedPokemon.pokemons.pokemons.map((finded) => {
        return (
          <div className={style.findedBoth}>
             <button onClick={resetSearchedPokemon} className={style.backHomeCards}>{' < Back Home'}</button>
            <Card pokemon={finded} />
          </div>
        );
      });
    }
  }
  return (
    <div className={style.cardsMainDiv}>
      <div className={style.filtersDiv}>
        <Filters
          resetFilters={resetFilters}
          pokemons={pokemons}
          setItems={setItems}
          getPokemons={getPokemons}
        />
      </div>
      <div className={style.cards}>
        {items.map((pokemon) => {
          return <Card pokemon={pokemon} />;
        })}
      </div>
      <div className={style.pageDiv}>
        {
          page - 1 > 0 ?   <button onClick={prevHandler} className={style.pageMover}>{page - 1}</button> : null
        }
        <button className={style.pageAlone}>{page}</button>

        {/* {
          items.length < 12 || (filtered[0] && (filtered.length < 12)) ?  null : <button onClick={nextHandler} className={style.pageMover}>
          {page + 1}
        </button>
        } */}
        <button onClick={nextHandler} className={style.pageMover}>
          {page + 1}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
    searchedPokemon: state.searchedPokemon,
    filtered: state.filtered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPokemons: (origin) => dispatch(getPokemons(origin)),
    filterPokemonsOrigin: (origin) => dispatch(filterPokemonsOrigin(origin)),
    resetFilters: () => dispatch(resetFilters()),
    resetSearchedPokemon: () => dispatch(resetSearchedPokemon())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
