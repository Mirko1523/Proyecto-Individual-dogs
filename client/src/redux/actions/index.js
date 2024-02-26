// Importación de axios para realizar solicitudes HTTP
import axios from 'axios';

// Definición de constantes para los tipos de acciones en el código
export const GET_DOGS = "GET_DOGS";
export const GET_BY_DOGSNAME = "GET_BY_DOGSNAME";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const GET_DOGS_TEMPERAMENTS = "GET_DOGS_TEMPERAMENTS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const POST_DOGS = "POST_DOGS";

// Función para obtener perros de la API
export function getDogs() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/`);
      dispatch({
        type: GET_DOGS,
        payload: response.data
      });
    } catch (error) {
      console.error("Error en la acción getDogs:", error);
    }
  };
}

// Función para obtener perros por nombre
export function getByDogsName(name) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/dogs/?name=${name}`);
      dispatch({
        type: GET_BY_DOGSNAME,
        payload: response.data
      });
    } catch (error) {
      console.error("Error en la acción getByDogsName:", error);
    }
  };
}

// Función para obtener temperamentos de los perros
export function getDogsTemperaments(){
    return async function (dispatch) {
   const response = await axios ("http://localhost:3001/temperaments")
   return dispatch ({
    type: "GET_DOGS_TEMPERAMENTS",
    payload: response.data
   })
    }

}

// Función para filtrar por origen
export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin
  };
};

// Función para filtrar por temperamento
export const filterByTemperament = (temperament) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload: temperament
  };
};

// Función para ordenar por nombre
export const orderByName = (orderName) => {
  return {
    type: ORDER_BY_NAME,
    payload: orderName
  };
};

// Función para ordenar por peso
export const orderByWeight = (orderWeight) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: orderWeight
  };
};

// Función para agregar un nuevo perro
export function postDog(payload) {
  return async function (dispatch) {
    try {
      console.log('Data being sent to server:', payload);

      const response = await axios.post("http://localhost:3001/dogs/", payload);

      console.log('Data received from server:', response.data);

      dispatch({ type: POST_DOGS, payload: response.data }); // Asegúrate de pasar la respuesta del servidor como payload
      return response.data;
    } catch (error) {
      console.error("Error while posting dog:", error);
    }
  };
}

// Función para establecer el orden de clasificación
export function setSortOrder(order) {
  return {
    type: SET_SORT_ORDER,
    payload: order,
  };
}


