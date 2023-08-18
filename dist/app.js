"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
//routes
const router_1 = require("./routes/router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use(body_parser_1.default.json());
app.use("/", router_1.router);
app.listen(port, () => console.log(`API available on http://localhost:${port}`));
exports.default = app;
