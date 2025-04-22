const express = require("express");
const {
    getRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
} = require("../controllers/routeController");

const router = express.Router();

router.get("/", getRoutes);
router.post("/", createRoute);
router.put("/:id", updateRoute);     // Update a route
router.delete("/:id", deleteRoute);  // Delete a route

module.exports = router;
