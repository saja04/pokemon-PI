import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const ORDER_POKEMONS = "ORDER_POKEMONS"
export const FILTER_POKEMONS_ORIGIN = "FILTER_POKEMONS_ORIGIN"
export const FILTER_POKEMONS_TYPE = "FILTER_POKEMONS_TYPE"
export const RESET_FILTERS = "RESET_FILTER"
export const RESET_SEARCHED_POKEMON = "RESET_SEARCHED_POKEMON"


export const getPokemons = (origin) => {
    return async(dispatch) => {
        const response = await axios(`http://localhost:3001/pokemon`);
        if(response.status === 400){
            return alert('error at server')
        }
        const data = response.data;
        console.log(data);
        // if(data === )
        return dispatch({
            type: GET_POKEMONS,
            payload: data,
        })
    }
}

export const searchPokemon = (name) => {
    return async(dispatch) => {
        const response = await axios(`http://localhost:3001/pokemoname/?name=${name}`)
        const data = response.data
        console.log(data);
        console.log(data);
        if(data === 'pokemon not found'){
            return alert('not found!')
        }
        return dispatch({
            type: SEARCH_POKEMON,
            payload: data,
        })
    }
}

export const orderPokemons = (order) => {
    return async(dispatch) => {
        return dispatch({
            type: ORDER_POKEMONS,
            payload: order
        })
    }
}

export const filterPokemonsOrigin = (origin) => {
    return async(dispatch) => {
        return dispatch({
            type: FILTER_POKEMONS_ORIGIN,
            payload: origin,
        })
    }
}

export const filterPokemonsType = (type) => {
    return async(dispatch) => {
        return dispatch({
            type:FILTER_POKEMONS_TYPE,
            payload: type
        })
    }
}

export const resetFilters = () => {
    return async(dispatch) => {
        return dispatch({
            type: RESET_FILTERS
        })
    }
}

export const resetSearchedPokemon = () => {
    return async(dispatch) => {
        return dispatch({
            type: RESET_SEARCHED_POKEMON
        })
    }
}

