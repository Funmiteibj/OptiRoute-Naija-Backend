const Route = require("../models/Route");

// Create a new route
const createRoute = async (req, res) => {
    try {
        const { state, from, to, transportType } = req.body;

        if (!state || !from || !to || !transportType) {
            return res.status(400).json({ message: "All fields (state, from, to, transportType) are required" });
        }

        const newRoute = new Route(req.body);
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(400).json({ message: "Failed to create route", error: error.message });
    }
};

// Get all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch routes", error: error.message });
    }
};

// Get a route by ID
const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: "Route not found" });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: "Error fetching route", error: error.message });
    }
};

// Update a route by ID
const updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: "Failed to update route", error: error.message });
    }
};

// Delete a route by ID
const deleteRoute = async (req, res) => {
    try {
        await Route.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete route", error: error.message });
    }
};

// Get distinct fromStops and toStops by state
const getRoutesByState = async (req, res) => {
    const { state } = req.params;

    try {
        const routes = await Route.find({ state });

        const fromStops = [...new Set(routes.map(route => route.from))];
        const toStops = [...new Set(routes.map(route => route.to))];

        res.status(200).json({ fromStops, toStops });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch routes by state", error: error.message });
    }
};

// Search for routes using request body (POST)
const searchRoutes = async (req, res) => {
    const { from, to, state, transportType } = req.body;

    try {
        const query = {};
        if (from) query.from = from;
        if (to) query.to = to;
        if (state) query.state = state;
        if (transportType) query.transportType = transportType;

        const routes = await Route.find(query);
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Failed to search routes", error: error.message });
    }
};

// Export all controllers
module.exports = {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    getRoutesByState,
    searchRoutes,
};
