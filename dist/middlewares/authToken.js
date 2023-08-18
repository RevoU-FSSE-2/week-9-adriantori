"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const username = req.body.name;
    if (token == null) {
        return res.status(401).send("token is empty");
    }
    jsonwebtoken_1.default.verify(token, process.env.KEYS, (err, user) => {
        if (err) {
            return res.status(403).send(err);
        }
        req.username = user;
        next();
    });
};
exports.default = authToken;
