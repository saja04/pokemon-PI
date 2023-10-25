import {
  GET_POKEMONS,
  SEARCH_POKEMON,
  ORDER_POKEMONS,
  FILTER_POKEMONS_TYPE,
  RESET_FILTERS,
  RESET_SEARCHED_POKEMON,
  FILTER_POKEMONS_ORIGIN,
} from "./actions";

import axios from "axios";

const getTypes = (await axios("http://localhost:3001/types/")).data;

let initialState = {
  pokemons: [],
  searchedPokemon: null,
  filtered: [],
  types: getTypes,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case SEARCH_POKEMON:
      return {
        ...state,
        searchedPokemon: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filtered: [],
      };
    case ORDER_POKEMONS:
      if (state.filtered[0]) {
        const oldFiltered = [...state.filtered];
        return {
          ...state,
          filtered:
            action.payload === "a-z"
              ? oldFiltered.sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  } else return 0;
                })
              : action.payload === "z-a"
              ? oldFiltered.sort((a, b) => {
                  if (a.name > b.name) {
                    return -1;
                  }
                  if (a.name < b.name) {
                    return 1;
                  } else return 0;
                })
              : action.payload === "attackIncrease"
              ? oldFiltered.sort((a, b) => {
                  if (a.attack < b.attack) {
                    return -1;
                  }
                  if (a.attack > b.attack) {
                    return 1;
                  } else return 0;
                })
              : action.payload === "attackDecrease"
              ? oldFiltered.sort((a, b) => {
                  if (a.attack > b.attack) {
                    return -1;
                  }
                  if (a.attack < b.attack) {
                    return 1;
                  } else return 0;
                })
              : null,
        };
      }
      const oldPokemons = [...state.pokemons];
      return {
        ...state,
        pokemons:
          action.payload === "a-z"
            ? oldPokemons.sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                } else return 0;
              })
            : action.payload === "z-a"
            ? oldPokemons.sort((a, b) => {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                } else return 0;
              })
            : action.payload === "attackIncrease"
            ? oldPokemons.sort((a, b) => {
                if (a.attack < b.attack) {
                  return -1;
                }
                if (a.attack > b.attack) {
                  return 1;
                } else return 0;
              })
            : action.payload === "attackDecrease"
            ? oldPokemons.sort((a, b) => {
                if (a.attack > b.attack) {
                  return -1;
                }
                if (a.attack < b.attack) {
                  return 1;
                } else return 0;
              })
            : null,
      };
    case FILTER_POKEMONS_TYPE:
      return {
        ...state,
        filtered: state.pokemons.filter((pokemon) => {
          if (pokemon.types[0] === action.payload) {
            return pokemon;
          } else if (pokemon.types[1] === action.payload) {
            return pokemon;
          } else if (pokemon.types[2] === action.payload) {
            return pokemon;
          }
        }),
      };
    case FILTER_POKEMONS_ORIGIN:
      const filteredDb = state.filtered.filter((pokemon) => {
        if(pokemon.origin === 'db'){
          return pokemon
        } else return;
      })
      const filteredApi = state.filtered.filter((pokemon)  => {
        if(pokemon.origin === 'api'){
          return pokemon;
        } else return;
      })
      const pokemonApi = state.pokemons.filter((pokemon) => {
        if(pokemon.origin === 'api'){
          return pokemon
        } else return;
      })
      const pokemonDb = state.pokemons.filter((pokemon) => {
        if(pokemon.origin === 'db'){
          return pokemon
        } else return;
      })
      console.log(state.filtered);
      if(action.payload === 'api'){
        if (state.filtered[0]) {
          return {
            ...state,
            filtered: filteredApi,
          };
        } else if(state.pokemons[0]){
          return {
            ...state,
            filtered: pokemonApi,
          };
        }
        else return
      } 
      
      else if(action.payload === 'db'){
        if (state.filtered[0]) {
          return {
            ...state,
            filtered: filteredDb,
          };
        } else if(state.pokemons[0]){
          return {
            ...state,
            filtered: pokemonDb
          };
        } else return
      }

    case RESET_SEARCHED_POKEMON:
      return {
        ...state,
        searchedPokemon: null,
      };
    default:
      return state;
  }
};
export default rootReducer;
