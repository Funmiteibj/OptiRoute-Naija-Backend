// models/Route.js
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    state: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    transportType: { type: String, required: true }, // danfo, keke, etc.
    price: String,
    waitTime: String,
    submittedBy: String, // optional for crowdsourced credit
}, { timestamps: true });

module.exports = mongoose.model("Route", routeSchema);

