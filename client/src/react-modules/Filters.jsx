import React from "react";
import { connect } from "react-redux";
import {
  filterPokemonsType,
  orderPokemons,
  filterPokemonsOrigin,
} from "../redux/actions";
import style from "../react-styles/Filters.module.css";

const Filters = ({
  pokemons,
  filterPokemonsType,
  types,
  setItems,
  filtered,
  orderPokemons,
  resetFilters,
  filterPokemonsOrigin,
  getPokemons
}) => {
  const typesHandler = (type) => {
    filterPokemonsType(type.target.value);
    setItems(filtered.splice(0, 12));
  };
  const orderHandler = (order) => {
    if (order.target.value === "aToZ") {
      orderPokemons("a-z");
    } else if (order.target.value === "zToA") {
      orderPokemons("z-a");
    } else if (order.target.value === "aIncrease") {
      orderPokemons("attackIncrease");
    } else if (order.target.value === "aDecrease") {
      orderPokemons("attackDecrease");
    }
  };

  const apiHandler = () => {
    filterPokemonsOrigin("api");
  };
  const dbHandler = () => {
    filterPokemonsOrigin("db");
  };

  const resetHandler = () => {
    resetFilters();
    getPokemons()
  }

  return (
    <div className={style.filterMainDiv}>
      <div className={style.originDiv}>
        <p className={style.filtersOrigin}>Origin:</p>
        <button
          type="button"
          className={style.buttonOrigin}
          onClick={dbHandler}
        >
          DB
        </button>
        <button
          type="button"
          className={style.buttonOrigin}
          onClick={apiHandler}
        >
          API
        </button>
      </div>

      <div className={style.typeDiv}>
        <p className={style.filtersOrigin}>Type: </p>
        <select
          placeholder="Types"
          onChange={typesHandler}
          className={style.type}
        >
          {types.map((type) => (
            <option value={type.name}>{type.name}</option>
          ))}
        </select>
      </div>

      <div className={style.orderButtons}>
        <p className={style.filtersOrigin}>Order: </p>
        <select placeholder="Order" onChange={orderHandler} className={style.orderSelect}>
          <option value="aToZ">A-Z</option>
          <option value="zToA">Z-A</option>
          <option value="aIncrease">Attack Low to High</option>
          <option value="aDecrease">Attack High to Low</option>
        </select>
      </div>
      <button onClick={resetHandler} className={style.resetButton}>Reset</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filtered: state.filtered,
    types: state.types,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterPokemonsType: (type) => dispatch(filterPokemonsType(type)),
    orderPokemons: (order) => dispatch(orderPokemons(order)),
    filterPokemonsOrigin: (origin) => dispatch(filterPokemonsOrigin(origin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
