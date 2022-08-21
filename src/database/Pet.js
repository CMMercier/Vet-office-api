const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllPetsRecords = (filterParams) => {
  try {
    let pets = DB.pets;
    if (filterParams.name) {
      return DB.pets.filter((pet) => 
      pet.name.toLowerCase().includes(filterParams.name)
      );
    }
    return pets;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOnePetRecord = (petId) => {
  try {
    const pet = DB.pets.find((pet) => pet.id === petId);
    if (!pet) {
      throw {
       status: 400,
       message: `Can't find pet with the id '${petId}'`,
      };
    }
    return pet;
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error };
  }
};

const createNewPetRecord = (newPet) => {
  try {
    const isAlreadyAdded =
      DB.pets.findIndex((pet) => pet.name === newPet.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `pet with the name '${newPet.name}' already exists`,
      };
    }
      DB.pets.push(newPet);
      saveToDatabase(DB);
      return newPet;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOnePetRecord = (petId, changes) => {
  try {
    const isAlreadyAdded =
      DB.pets.findIndex((pet) => pet.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `pet with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.pets.findIndex(
      (pet) => pet.id === petId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find pet with the id '${petId}'`,
      };
    }
    const updatedPet = {
      ...DB.pets[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.pets[indexForUpdate] = updatedPet;
    saveToDatabase(DB);
    return updatedPet;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOnePetRecord = (petId) => {
  try {
    const indexForDeletion = DB.pets.findIndex(
      (pet) => pet.id === petId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find pet with the id '${petId}'`,
      };
    }
    DB.pets.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllPetsRecords,
  createNewPetRecord,
  getOnePetRecord,
  updateOnePetRecord,
  deleteOnePetRecord,
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Fluffy 
 *         type:
 *           type: string
 *           example: Dog
 *         breed:
 *           type: string
 *           example: Malamute
 *         owner:
 *           type: string
 *           example: 06017dac-55e7-41e7-8947-fd47df5d32b4
 *         info:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Cough"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */