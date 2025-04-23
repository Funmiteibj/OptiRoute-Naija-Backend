// models/Route.js
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    state: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    transportType: { type: String, required: true },
    price: { type: String, default: "" },
    waitTime: { type: String, default: "" },
    submittedBy: { type: String, default: "" },
    description: { type: String, default: "" }, // 
}, { timestamps: true });

module.exports = mongoose.model("Route", routeSchema);

