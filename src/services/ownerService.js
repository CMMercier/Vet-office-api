const Owner = require("../database/Owner");

const getOwnerForpet = (petId) => {
    try {
        const owner = Owner.getOwnerForpet(petId);
        return owner;
    } catch (error) {
        throw error;
    }
};

module.exports = { getOwnerForpet };