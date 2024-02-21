import {GET_DOGS, GET_BY_DOGSNAME, SET_SORT_ORDER} from '../actions/index'

//se define el estado inicial(initialState) 
//tiene dos arreglos y una cadena(asc)
let initialState = {
   allDogs : [],
    filteredDogs: [],
 
    //Se establece el orden inicial
    sortOrder: 'asc', 
}

//definimos la funcion rootReducer que recibe dos parametros(state y action)
//state represente estado actual
//action es la accion que se desencadena
function rootReducer(state = initialState, action) {
    //switch: es un tipo de mecanismo que permite que el valor de una variable cambie el flujo de control de ejecuion del 
    //programa mediane busqueda y mapeo.
    //En este caso switch maneja diferente tipos de acciones que dependendiendo cada accion es el bloque de codigo que 
    //se accionara.
    switch (action.type) {
        //Se utiliza para obtener una lista completa de perros
      case GET_DOGS:
        return {
          
          ...state,
          allDogs: action.payload,
          filteredDogs: action.payload,
    
        };
        //Se utiliza para obtener al perro por nombre
      case GET_BY_DOGSNAME:
        return {
          ...state,
          filteredDogs: action.payload,
        };
        // Se utiliza para ordenar la clasificacion de los perros
      case SET_SORT_ORDER:
        return {
          ...state,
          sortOrder: action.payload,
        };
      default:
        return state;
    }
  }
  //exportamos
  export default rootReducer; 