"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.KEYS;
const verifyToken = (req, res) => {
    let token = req.session.token;
    let userId;
    if (!token) {
        return res.send("No token provided");
    }
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.send("Unauthorized");
        }
        else {
            return userId = decoded.id;
        }
    });
};
exports.default = verifyToken;
