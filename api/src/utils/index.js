//Creo una constante cleanInfoApi
//esta constante toma un arreglo de datos de 'arr' que lo usa como argumento.
//Y esta funcion realiza un MAP(mapeo)
const cleanInfoApi = (arr) => arr.data.map (dog =>{
return {
    id: dog.id,
    name: dog.name,
    image: dog.image.url,
    weight: dog.weight.metric,
    height : dog.height.metric,
    life_span : dog.life_span,
    temperament: dog.temperament,
    created: false
}
})
const cleanIdInfoApi = (obj) => {
    const {
        id,
        name,
        image,
        weight,
        height,
        life_span
    } = obj
    return {
    id,
    name,
    image: image.url,
    weight:weight.metric,
    height:height.metric,
    life_span,
    created: false
    }
}

//exporto
module.exports = {
    cleanInfoApi,
    cleanIdInfoApi
}