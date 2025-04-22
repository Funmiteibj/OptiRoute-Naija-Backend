const express = require("express");
const {
    getRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
    searchRoutes,
} = require("../controllers/routeController");

const router = express.Router();

router.get("/", getRoutes);
router.post("/", createRoute);
router.post("/search", searchRoutes); 
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

module.exports = router;

