const express = require("express");
const {
    getRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
    searchRoutes,
    getRoutesByState, // Import the new controller method
} = require("../controllers/routeController");

const router = express.Router();

router.get("/", getRoutes);
router.post("/", createRoute);
router.post("/search", searchRoutes); 
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);
router.get("/state/:state", getRoutesByState); // Endpoint to get routes by state

module.exports = router;

