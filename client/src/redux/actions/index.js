// //con esta importacion axios realizamos solicitudes http
// import axios from 'axios';

// //definimos constantes para los tipos de acciones que se van a hacer en el codigo
// export const GET_DOGS = "GET_DOGS";
// export const GET_BY_DOGSNAME = "GET_BY_DOGSNAME";
// export const SET_SORT_ORDER = "SET_SORT_ORDER";
// export const GET_DOGS_TEMPERAMENTS = "GET_DOGS_TEMPERAMENTS";
// //agrego para funcionalidad del filter:
// export const FILTER_BY_ORIGIN= "FILTER_BY_ORIGIN"
// export const FILTER_BY_TEMPERAMENT= "FILTER_BY_TEMPERAMENT"
// export const ORDER_BY_NAME= "ORDER_BY_NAME"
// export const ORDER_BY_WEIGHT= "ORDER_BY_WEIGHT"
// //agrego funcionalidad para el post dog:
// export const POST_DOGS = "POST_DOGS"


// //esta funcion utiliza axios para hacer una solicitud a la api
// //dispara una accion redux con GET_DOGS y da una respuesta
// export function getDogs () {
//      //el dispatch se utiliza para enviar una accion a la store 
//     //lleva datos de la respuesta de la api
// return async function (dispatch){
//     const response = await axios.get(`http://localhost:3001/dogs/`)
//     // console.log('data, ', response.data)
//    return dispatch({
//     type: GET_DOGS,
//     payload: response.data
//    })
// }
// }

// export function getByDogsName(name) {
//   return async function (dispatch) {
//     try {
//       const response = await axios(`http://localhost:3001/dogs/?name=${name}`)
//       dispatch({
//         type: GET_BY_DOGSNAME,
//         payload: response.data
//       });
//     } catch (error) {
//       console.error("Error en la acción getByDogsName:", error);
//     }
//   }
// }


// export function getDogsTemperaments(){
//     return async function (dispatch) {
//    const response = await axios ("http://localhost:3001/temperaments")
//    return dispatch ({
//     type: "GET_DOGS_TEMPERAMENTS",
//     payload: response.data
//    })
//     }
// }

// export const filterByOrigin = (origin) => {
//     return {
//         type: FILTER_BY_ORIGIN,
//         payload: origin
//     }
// }

// export const filterByTemperament = (temperament) => {
//     return {
//         type: FILTER_BY_TEMPERAMENT,
//         payload: temperament
//     }
// }

// export const orderByName = (orderName) => {
//     return {
//         type: ORDER_BY_NAME,
//         payload: orderName
//     }
// }

// export const orderByWeight = (orderWeight) => {
//     return {
//         type: ORDER_BY_WEIGHT,
//         payload: orderWeight
//     }
// }

// export function postDog(payload) {
//   return async function (dispatch) {
//       try {
//           const data = await axios.post("http://localhost:3001/dogs/", payload);
//           console.log(data);
//           dispatch({ type: POST_DOGS });
//              console.log('Data being sent to server:', payload);
//           return data;
       
//       } catch (error) {
//           console.error("Error while posting dog:", error);
//            console.error("Error while posting dog:", error);
//       }
//   };
// }
// //atributo: setSortOrder(especifica el tipo de acciom)
// //el payload se usa en este caso para transportar el parametro order
// //el order es el nuevo roden de clasificaion que se desea establecer

// export function setSortOrder (order) {
// return {
//     type: "SET_SORT_ORDER",
//     payload: order,
// }
// }

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
      const data = await axios.post("http://localhost:3001/dogs/", payload);
      console.log(data);
      dispatch({ type: POST_DOGS });
      console.log('Data being sent to server:', payload);
      return data;
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


