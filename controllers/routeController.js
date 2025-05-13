const Route = require("../models/Route");

const createRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (error) {
        res.status(400).json({ message: "Failed to create route", error: error.message });
    }
};

const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch routes", error: error.message });
    }
};

const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: "Route not found" });
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ message: "Error fetching route", error: error.message });
    }
};

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

const deleteRoute = async (req, res) => {
    try {
        await Route.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete route", error: error.message });
    }
};

const getRoutesByState = async (req, res) => {
    const { state } = req.params;

    try {
        const routes = await Route.find({ state: state });
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch routes by state", error: error.message });
    }
};

const searchRoutes = async (req, res) => {
    const { from, to, state } = req.query;

    try {
        const query = {};
        if (from) query.from = from;
        if (to) query.to = to;
        if (state) query.state = state;

        const routes = await Route.find(query);
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ message: "Failed to search routes", error: error.message });
    }
};

module.exports = {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    getRoutesByState,
    searchRoutes,
};
