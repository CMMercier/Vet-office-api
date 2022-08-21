const ownerService = require("../services/ownerService");

const getOwnerForpet = (req, res) => {
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
        const owner = ownerService.getOwnerForpet(petId);
        res.send({ status: "OK", data: owner });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error} });
    }
};

module.exports = { getOwnerForpet };