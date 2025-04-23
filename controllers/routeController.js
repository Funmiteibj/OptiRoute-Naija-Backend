// controllers/routeController.js
const Route = require("../models/Route");

exports.getRoutes = async (req, res) => {
    try {
        const { state, from, to, transportType } = req.query;
        const query = {};

        if (state) query.state = state;
        if (from) query.from = from;
        if (to) query.to = to;
        if (transportType) query.transportType = transportType;

        const routes = await Route.find(query);
        res.json(routes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createRoute = async (req, res) => {
    try {
        const {
            state,
            from,
            to,
            transportType,
            price = "",
            waitTime = "",
            submittedBy = "",
            description = "", // 💡 include this
        } = req.body;

        if (!state || !from || !to || !transportType) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const route = new Route({
            state,
            from,
            to,
            transportType,
            price,
            waitTime,
            submittedBy,
            description, // 💡 include this
        });

        await route.save();
        res.status(201).json(route);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Update a route by ID
exports.updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return the updated document
        );
        if (!updatedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.json(updatedRoute);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a route by ID
exports.deleteRoute = async (req, res) => {
    try {
        const deletedRoute = await Route.findByIdAndDelete(req.params.id);
        if (!deletedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.json({ message: "Route deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Search routes 
exports.searchRoutes = async (req, res) => {
    try {
        const { state, from, to, transportType } = req.body;
        const query = {};

        if (state) query.state = state;
        if (from) query.from = from;
        if (to) query.to = to;
        if (transportType) query.transportType = transportType;

        const routes = await Route.find(query);
        res.json(routes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRoutesByState = async (req, res) => {
    try {
        const { state } = req.params;
        const routes = await Route.find({ state });

        // Extract unique "from" and "to" bus stops from routes
        const fromStops = [...new Set(routes.map(route => route.from))];
        const toStops = [...new Set(routes.map(route => route.to))];

        res.json({ fromStops, toStops });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

