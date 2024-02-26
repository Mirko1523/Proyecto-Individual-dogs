const cleanInfoApi = (arr) => {
    return arr.data.map(dog => {
        const image = dog.image ? `https://cdn2.thedogapi.com/images/${dog.image.id}.jpg` : null;

        return {
            id: dog.id,
            name: dog.name,
            image: image,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            created: false
        };
    });
};

const cleanIdInfoApi = (obj) => {
    const {
        id,
        name,
        reference_image,
        weight,
        height,
        life_span,
    } = obj;

    const image = reference_image ? `https://cdn2.thedogapi.com/images/${dog.image.id}.jpg` : null;

    return {
        id,
        name,
        image,
        weight: weight.metric,
        height: height.metric,
        life_span,
        created: false
    };
};

//exporto
module.exports = {
    cleanInfoApi,
    cleanIdInfoApi
};
