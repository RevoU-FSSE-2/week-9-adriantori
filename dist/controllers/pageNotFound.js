"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
//pageNotFound
const pageNotFound = (req, res) => {
    res.status(404).send(`<h1>page not found</h1>`);
};
exports.default = pageNotFound;
