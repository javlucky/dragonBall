const { Character, Planet } = require('../db');
const axios = require('axios');
const { error } = require('console');
const { Op } = require('sequelize');

const findCharacterApi = async (name) => {
    let callApi = await axios.get(`https://dragonball-api.com/api/characters/${name}`)
        .catch(() => { return false })
    if (callApi) return true
}

const createCharacter = async (
    name, race, gender, ki, maxKi, description, affiliation, originPlanet, created ) => {
        if(name){
            let findDb = await Character.findOne({
                where: {name}
            })
        if(await findCharacterApi(name)) throw new Error('The character already exists...')
        else if(findDb) throw new Error('The character already exists...')
        else {const characterCreate = await Character.create({
            name: name,
            race: race,
            gender: gender,
            ki: ki,
            maxKi: maxKi,
            description: description,
            affiliation: affiliation,
            originPlanet: originPlanet,
            created: created    
        })
    
        const planetDb = await Planet.findAll({
            where: {name:planet}
        })

        characterCreate.addPlanet(planetDb)
            return 'Character created successfully'
    }    
    }else{
        return 'You must enter a name'
    }
};

const getCharacterById = async (value) => {
    if(value.length>5){
            const findDbId = await Character.findByPk(value, {include:Planet})
            const detailOfCharacterInDb = {
                id: findDbId.id,
                name: findDbId.name,
                race: findDbId.race,
                gender: findDbId.gender,
                ki: findDbId.ki,
                maxKi: findDbId.maxKi,
                description: findDbId.description,
                affiliation: findDbId.affiliation,
                originPlanet: findDbId.originPlanet,
                created: findDbId.created
            }
            return detailOfCharacterInDb
    }else{
        return charactersByNameInApi(value)
    }
};

const charactersByNameInApi = async (value) => {
        const characterPrueba = await axios.get(`https://dragonball-api.com/api/characters/${value.toLowerCase().trim()}`)
        const characterValue = [{
            id: characterPrueba.data.id,
            name: characterPrueba.data.name,
            race: characterPrueba.data.race,
            gender: characterPrueba.data.gender,
            ki: characterPrueba.data.ki,
            maxKi: characterPrueba.data.maxKi,
            description: characterPrueba.data.description,
            description: characterPrueba.data.affiliation,
            originPlanet: characterPrueba.data.planet.map(m=>m.planet.name)
        }]
        return characterValue
};

const searchCharacterByName = async (name) => {
    let findNameInDb = await Character.findAll({
        where: {name : {[Op.iLike] : `%${name}%`}},
        attributes:["id","name","hp","race","gender","ki","maxKi","description","description", "originPlanet"],
        include:{
            model: Planet,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
     })
    
    findNameInDb= findNameInDb.map(m=>{
        return {
        ...m.dataValues, 
       planet: m.planet?.map(m=>m.name)
    }})
    
    if(!findNameInDb[0]) return pokemonsByNameInApi(name)
    
    return findNameInDb;
};

const getAllCharacters = async () => {
    const firstCallApi = await axios.get('https://dragonball-api.com/api/characters')
    const charactersCall1 = await Promise.all(firstCallApi.data.items.map(m=> axios.get(m.url)))

    const secondCallApi = await axios.get(firstCallApi.data.next)
    const charactersCall2 = await Promise.all(secondCallApi.data.items.map(m=> axios.get(m.url)))

    const totalCharacters = [ ...charactersCall1, ...charactersCall2 ]

    // const resPromises = await Promise.all(totalCharacters)

    // const charactersData = resPromises.map(p=>{
    //     return{
    //         id: p.data.id,
    //         name: p.data.name,
    //         ki: p.data.ki,
    //         maxKi: p.data.maxKi,
    //     }
    // })
    const charactersData = totalCharacters.map((p) => ({
        id: p.data.id,
        name: p.data.name,
        ki: p.data.ki,
        maxKi: p.data.maxKi,
    }));
    return charactersData;
};

const deleteCharacter = async (id) => {
    let eliminar = await Character.destroy({
        where: {id}
    });

    return eliminar;
};

module.exports = { createCharacter, getCharacterById, getAllCharacters, deleteCharacter, searchCharacterByName };