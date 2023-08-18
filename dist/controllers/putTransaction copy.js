"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const model_1 = __importDefault(require("../models/model"));
//put by id
const putTransaction = (req, res) => {
    const currTransaction = model_1.default;
    let success = false;
    for (let i = 0; i < currTransaction.length; i++) {
        if (currTransaction[i].id == +req.params.id) {
            if (req.body.type == null || req.body.name == null || req.body.detail == null || req.body.amount == null) {
                res.send("Error: All field must be filled in");
            }
            else {
                const currentData = currTransaction[i];
                currTransaction[i].type = req.body.type;
                currTransaction[i].name = req.body.name;
                currTransaction[i].detail = req.body.detail;
                currTransaction[i].amount = req.body.amount;
                success = true;
                res.json({
                    message: "success updating data", currentData
                });
            }
        }
    }
    if (success == false) {
        res.send("Error: ID not found");
    }
};
exports.default = putTransaction;
