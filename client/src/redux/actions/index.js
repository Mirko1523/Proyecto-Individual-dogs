//con esta importacion axios realizamos solicitudes http
import axios from 'axios';

//definimos constantes para los tipos de acciones que se van a hacer en el codigo
export const GET_DOGS = "GET_DOGS";
export const GET_BY_DOGSNAME = "GET_BY_DOGSNAME";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const GET_DOGS_TEMPERAMENTS = "GET_DOGS_TEMPERAMENTS";
//agrego para funcionalidad del filter:
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY = "FILTER_BY";
export const POST_DOGS = "POST_DOGS"
//esta funcion utiliza axios para hacer una solicitud a la api
//dispara una accion redux con GET_DOGS y da una respuesta
export function getDogs () {
     //el dispatch se utiliza para enviar una accion a la store 
    //lleva datos de la respuesta de la api
return async function (dispatch){
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/")
    console.log('data, ', response.data)
   return dispatch({
    type: GET_DOGS,
    payload: response.data
   })
}
}

//esta funcion utiliza axios para hacer realizar una solicitud al servidor local
//dispara una accion redux con GET_BY_DOGSNAME y da una respuesta
export function getByDogsName (name) {
    //el dispatch se utiliza para enviar una accion a la store 
    //lleva datos de la respuesta de la api
return async function (dispatch){
    const response = await axios(`http://localhost:3001/dogs?name=${name}`)
    return dispatch({
        type: "GET_BY_DOGSNAME",
        payload:  response.data
    })
}

}

export function getDogsTemperaments(){
    return async function (dispatch) {
   const response = await axios ("http://localhost:3001/temperaments")
   return dispatch ({
    type: "GET_DOGS_TEMPERAMENTS",
    payload: response.data
   })
    }

}
export function postDog(payload) {
  return async function (dispatch) {
      try {
          const data = await axios.post("http://localhost:3001/dogs/", payload);
          console.log(data);
          dispatch({ type: POST_DOGS, payload: data });
          return data;
      } catch (error) {
          console.error("Error while posting dog:", error);
      }
  };
}
//atributo: setSortOrder(especifica el tipo de acciom)
//el payload se usa en este caso para transportar el parametro order
//el order es el nuevo roden de clasificaion que se desea establecer

export function setSortOrder (order) {
return {
    type: "SET_SORT_ORDER",
    payload: order,
}
}

//* Ordenamiento
export function orderBy(order) {
  return function (dispatch) {
    dispatch({ type: ORDER_BY, payload: order });
  };
}

//* Filtrado
export function filterBy(order) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY, payload: order });
  };
}


