const express = require("express");
const router = express.Router();
const { getPlantCareTips } = require("../controllers/plantCareController");

router.post("/", getPlantCareTips);

module.exports = router;
