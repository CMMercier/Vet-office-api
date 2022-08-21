const petService = require("../services/petService");

const getAllPetsRecords = (req, res) => {
  const { role } = req.user;
  if (role !== 'staff') {
    res
    .status(403)
    .send({ 
      status: "Forbidden", 
      data: { error: "You are not authorized to view this page" },
    });
  }
  const { name } = req.query;
  try {
    const allPetsRecords = petService.getAllPetsRecords({ name });
    res.send({ status: "OK", data: allPetsRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOnePetRecord = (req, res) => {
  const {
    params: { petId },
  } = req;
  if (!petId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':petId' can not be empty" },
      });
  }
  const { role } = req.user;
  if (role !== 'staff') {
    res
    .status(403)
    .send({ 
      status: "Forbidden", 
      data: { error: "You are not authorized to view this page" },
    });
  }
  try {
    const pet = petService.getOnePetRecord(petId);
    res.send({ status: "OK", data: pet });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error} });
  }
};

const createNewPetRecord = (req, res) => {
  const { role } = req.user;
  if (role !== 'staff') {
    res
    .status(403)
    .send({ 
      status: "Forbidden", 
      data: { error: "You are not authorized to view this page" },
    });
  }
  const { body } = req;
  if (
    !body.name ||
    !body.type ||
    !body.breed ||
    !body.owner ||
    !body.info
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
          "One of the following keys is missing or is empty in request body: 'name', 'type', 'breed', 'owner', 'info'",  
        },
      });
    return;
  }
  const newPet = {
    name: body.name,
    type: body.type,
    breed: body.breed,
    owner: body.owner,
    info: body.info,
  };
  try {
    const createdPet = petService.createNewPetRecord(newPet);
    res.status(201).send({ status: "OK", data: createdPet });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error} });
  }
};

const updateOnePetRecord = (req, res) => {
  const { role } = req.user;
  if (role !== 'staff') {
    res
    .status(403)
    .send({ 
      status: "Forbidden", 
      data: { error: "You are not authorized to view this page" },
    });
  }
  const {
    body,
    params: { petId },
  } = req;
  if (!petId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':petId' can not be empty" },
      });
  }
  try {
    const updatedPet = petService.updateOnePetRecord(petId, body);
    res.send({ status: "OK", data: updatedPet });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOnePetRecord = (req, res) => {
  const { role } = req.user;
  if (role !== 'staff') {
    res
    .status(403)
    .send({ 
      status: "Forbidden", 
      data: { error: "You are not authorized to view this page" },
    });
  }
  const {
    params: { petId },
  } = req;
  if (!petId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':petId' can not be empty" },
      });
  }
  try {
    petService.deleteOnePetRecord(petId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllPetsRecords,
  getOnePetRecord,
  createNewPetRecord,
  updateOnePetRecord,
  deleteOnePetRecord,
};