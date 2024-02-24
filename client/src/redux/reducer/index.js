import {
  GET_DOGS,
  GET_BY_DOGSNAME,
  SET_SORT_ORDER,
  ORDER_BY,
  FILTER_BY,
  GET_DOGS_TEMPERAMENTS,
  POST_DOGS,
} from '../actions/index';

let initialState = {
  allDogs: [],
  filteredDogs: [],
  temperaments: [],
  sortOrder: 'asc', // Orden inicial
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };

    case GET_BY_DOGSNAME:
      return {
        ...state,
        allDogs: action.payload,
        filteredDogs: action.payload,
      };

    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
      case POST_DOGS:
        return {
          ...state,
          allDogs: [...state.allDogs, action.payload],
        };

    case FILTER_BY:
      if (action.payload === 'default') {
        return { ...state, filteredDogs: state.allDogs };
      } else if (action.payload === 'API') {
        const filteredDogs = state.allDogs.filter((dog) => dog.fromApi);
        return { ...state, filteredDogs };
      } else if (action.payload === 'DB') {
        const filteredDogs = state.allDogs.filter((dog) => !dog.fromApi);
        return { ...state, filteredDogs };
      } else {
        const filteredDogsByTemperament = state.allDogs.filter((dog) =>
          dog.temperaments &&
          dog.temperaments.some((temp) => temp.toLowerCase() === action.payload.toLowerCase())
        );
        return { ...state, filteredDogs: [...filteredDogsByTemperament] };
      }

    case ORDER_BY:
      const { sortOrder } = state; // Usa el orden de clasificación existente
      let sortedDogs = [...state.filteredDogs];

      if (action.payload === 'A-Z') {
        sortedDogs.sort((prev, next) => {
          if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
          if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
          return 0;
        });
      } else if (action.payload === 'Z-A') {
        sortedDogs.sort((prev, next) => {
          if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
          if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
          return 0;
        });
      } else if (action.payload === 'desc') {
        sortedDogs.sort((prev, next) => next.weight - prev.weight);
      } else if (action.payload === 'asc') {
        sortedDogs.sort((prev, next) => prev.weight - next.weight);
      }

      return { ...state, filteredDogs: sortedDogs };

      case GET_DOGS_TEMPERAMENTS:
        console.log('Temperaments:', action.payload);
        return {
          ...state,
          temperaments: action.payload, 
        };

    default:
      return state;
  }
};

export default dogReducer;