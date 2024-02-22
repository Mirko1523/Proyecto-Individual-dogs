// import {GET_DOGS, GET_BY_DOGSNAME, SET_SORT_ORDER,ORDER_BY, FILTER_BY } from '../actions/index'

// //se define el estado inicial(initialState) 
// //tiene dos arreglos y una cadena(asc)
// let initialState = {
//    allDogs : [],
//    filteredDogs: [],
//   temperaments: [],
//     //Se establece el orden inicial
//     sortOrder: 'asc', 
// }

// //definimos la funcion rootReducer que recibe dos parametros(state y action)
// //state represente estado actual
// //action es la accion que se desencadena
// const dogReducer = (state = initialState, action) => {
//     //switch: es un tipo de mecanismo que permite que el valor de una variable cambie el flujo de control de ejecuion del 
//     //programa mediane busqueda y mapeo.
//     //En este caso switch maneja diferente tipos de acciones que dependendiendo cada accion es el bloque de codigo que 
//     //se accionara.
//     switch (action.type) {
//         //Se utiliza para obtener una lista completa de perros
//         case GET_DOGS:
//           return {
//             ...state,
//             allDogs: action.payload,
//             filteredDogs: action.payload,
//           };
//         case GET_BY_DOGSNAME:
//           return {
//             ...state,
//             filteredDogs: action.payload,
//           };
//         case SET_SORT_ORDER:
//           return {
//             ...state,
//             sortOrder: action.payload,
//           };
//           case FILTER_BY:
//             if (action.payload === 'default') {
//               return { ...state, filteredDogs: state.allDogs };
//             } else if (action.payload === 'API') {
//               const filteredDogs = state.allDogs.filter(dog => dog.fromApi); // Asegúrate de tener una propiedad fromApi en tus datos
//               return { ...state, filteredDogs };
//             } else if (action.payload === 'DB') {
//               const filteredDogs = state.allDogs.filter(dog => !dog.fromApi); // Asegúrate de tener una propiedad fromApi en tus datos
//               return { ...state, filteredDogs };
//             } else {
//               const filteredDogsByTemperament = state.allDogs.filter(dog =>
//                 dog.temperaments && dog.temperaments.some(temp => temp.toLowerCase() === action.payload.toLowerCase())
//               );
//               return { ...state, filteredDogs: [...filteredDogsByTemperament] };
//             }
//         case ORDER_BY:
//           if (action.payload === 'A-Z') {
//             return {
//               ...state,
//               filteredDogs: [...state.filteredDogs].sort((prev, next) => {
//                 if (prev.name > next.name) return 1;
//                 if (prev.name < next.name) return -1;
//                 return 0;
//               }),
//             };
//           } else if (action.payload === 'Z-A') {
//             return {
//               ...state,
//               filteredDogs: [...state.filteredDogs].sort((prev, next) => {
//                 if (prev.name > next.name) return -1;
//                 if (prev.name < next.name) return 1;
//                 return 0;
//               }),
//             };
//           } else if (action.payload === 'desc') {
//             return {
//               ...state,
//               filteredDogs: [...state.filteredDogs].sort((prev, next) => prev.weight - next.weight),
//             };
//           } else if (action.payload === 'asc') {
//             return {
//               ...state,
//               filteredDogs: [...state.filteredDogs].sort((prev, next) => next.weight - prev.weight),
//             };
//           } else {
//             return { ...state, filteredDogs: state.allDogs };
//           }
//         default:
//           return state;
//       }
//     };
    
//     export default dogReducer;

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
        return {
          ...state,
          temperaments: action.payload, 
        };

    default:
      return state;
  }
};

export default dogReducer;