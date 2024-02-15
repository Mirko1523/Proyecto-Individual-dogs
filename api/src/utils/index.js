//Creo una constante cleanInfoApi
//esta constante toma un arreglo de datos de 'arr' que lo usa como argumento.
//Y esta funcion realiza un MAP(mapeo)
const cleanInfoApi = (arr) => arr.data.map (dog =>{
return {
    name: dog.name,
    image: dog.image,
    weight: dog.weight,
    height : dog.height,
    life_span : dog.life_span,
    created: false
}
})

//exporto
module.exports = {
    cleanInfoApi
}