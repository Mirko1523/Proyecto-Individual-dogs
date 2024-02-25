import {
  GET_DOGS,
  GET_BY_DOGSNAME,
  SET_SORT_ORDER,
  FILTER_BY_ORIGIN, 
  FILTER_BY_TEMPERAMENT, 
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
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
   
      case GET_DOGS_TEMPERAMENTS:
        // console.log('Temperaments:', action.payload);
        return {
          ...state,
          temperaments: action.payload, 
        };
 case POST_DOGS:
  return {
    ...state,
    allDogs: [...state.allDogs, action.payload],
    filteredDogs: [...state.filteredDogs, action.payload],
  };
  
case FILTER_BY_ORIGIN:
  const filterByOrigin = state.allDogs.filter(dog => {
    if (action.payload === 'Todos') {
      return true; 
    } else if (action.payload === 'API') {
    
      return typeof dog.id === 'number';
    } else if (action.payload === 'DataBase') {
  
      return typeof dog.id !== 'number';
    }
  });
console.log('All Dogs:', state.allDogs);
  console.log('Filtered Dogs:', filterByOrigin);

  return {
    ...state,
    filteredDogs: filterByOrigin
  };

// case FILTER_BY_ORIGIN:
//   const filterByOrigin = state.allDogs.filter(dog => {
//     if (action.payload === 'Todos') {
//       return true; // Devuelve todos los perros
//     } else if (action.payload === 'DataBase') {
//       // Devuelve solo los perros que tienen un id generado por la base de datos
//       return dog.id && typeof dog.id === "number";
//     } else {
//       // Devuelve solo los perros que no tienen un id generado por la base de datos
//       return !dog.id || typeof dog.id !== "number";
//     }
//   });

//   return {
//     ...state,
//     filteredDogs: filterByOrigin
//   };

        case FILTER_BY_TEMPERAMENT:
            let temp = [];
            temp = state.allDogs.filter(
                (dog) =>
                    dog.temperament &&
                    action.payload &&
                    dog.temperament.includes(action.payload)
            );
            return {
                ...state,                
                filteredDogs: temp,
            }
        case ORDER_BY_NAME: 
            const dogsToOrder = action.payload;
            let dogsToName = dogsToOrder === 'A-Z' 
            ? [...state.filteredDogs].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return nameA.localeCompare(nameB);
            })
            : dogsToOrder === 'Z-A'
            ?[...state.filteredDogs].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                return nameB.localeCompare(nameA);
                })
                :[...state.filteredDogs]
                console.log('Filtered Dogs after ORDER_BY_NAME:', dogsToName);
            return {
                ...state,
                filteredDogs: dogsToName
            }
   case ORDER_BY_WEIGHT:
  const orderWeight = action.payload;
  switch (orderWeight) {
    case 'weightDesc':
      const orderedByWeightDesc = [...state.filteredDogs].sort((a, b) => {
        const weightA = parseInt(a.weight.split(' - ')[1]);
        const weightB = parseInt(b.weight.split(' - ')[1]);
        return weightB - weightA;
      });
      return {
        ...state,
        filteredDogs: orderedByWeightDesc,
      };
    case 'weightAsc':
      const orderedByWeightAsc = [...state.filteredDogs].sort((a, b) => {
        const weightA = parseInt(a.weight.split(' - ')[1]);
        const weightB = parseInt(b.weight.split(' - ')[1]);
        return weightA - weightB;
      });
      return {
        ...state,
        filteredDogs: orderedByWeightAsc,
      };
    default:
      return state;
  }

    default:
      return state;
  }
  
};


export default dogReducer;