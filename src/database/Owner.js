const DB = require("./db.json");

const getOwnerForpet = (petId) => {
    try {
        const owner = DB.owners.filter((owner) => owner.pet === petId);
        if (!owner) {
            throw{
                status: 400,
                message: `Can't find pet with the id '${petId}'`,
            };
        }
        return owner;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { getOwnerForpet };