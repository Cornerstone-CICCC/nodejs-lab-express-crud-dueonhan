"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import Express package
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv package
dotenv_1.default.config(); // Read .env file
const cors_1 = __importDefault(require("cors"));
const employess_routes_1 = __importDefault(require("../routes/employess.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/employees", employess_routes_1.default);
// Fallback
app.use((req, res, next) => {
    res.status(404).send("Invalid route");
});
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
