const express = require("express");
const {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    getRoutesByState,
    searchRoutes
} = require("../controllers/routeController");

const router = express.Router();

router.post("/", createRoute);
router.get("/", getAllRoutes);
router.get("/state/:state", getRoutesByState); 
router.get("/search", searchRoutes);
router.get("/:id", getRouteById);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

module.exports = router;
