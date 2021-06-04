"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const table_1 = require("./routes/table");
const cors_1 = __importDefault(require("cors"));
const port = 7800;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api/school', table_1.router);
app.listen(port, () => {
    console.log(`Server is running fine on port ${port}`);
});
