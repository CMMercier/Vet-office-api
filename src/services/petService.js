const { v4: uuid } = require("uuid");
const Pet = require("../database/Pet");

const getAllPetsRecords = (filterParams) => {
  try {
    const allpets = Pet.getAllPetsRecords(filterParams);
    return allpets;
  } catch (error) {
    throw error;
  }
};

const getOnePetRecord = (petId) => {
  try {
    const pet = Pet.getOnePetRecord(petId);
    return pet;
  } catch (error) {
    throw error;
  }
};

const createNewPetRecord = (newPet) => {
  const petToInsert = {
    ...newPet,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
  const createdPet = Pet.createNewPetRecord(petToInsert);
  return createdPet;
  } catch (error){
    throw error;
  }
};

const updateOnePetRecord = (petId, changes) => {
  try {
    const updatedPet = Pet.updateOnePetRecord(petId, changes);
    return updatedPet;
  } catch (error) {
    throw error;
  }
};

const deleteOnePetRecord = (petId) => {
  try {
    Pet.deleteOnePetRecord(petId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPetsRecords,
  getOnePetRecord,
  createNewPetRecord,
  updateOnePetRecord,
  deleteOnePetRecord,
};