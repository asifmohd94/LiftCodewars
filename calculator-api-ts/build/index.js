"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calc_1 = require("./routes/calc");
const app = express_1.default();
const port = 3000;
app.use('/api/calc', calc_1.router);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
