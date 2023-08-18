"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const model_1 = __importDefault(require("../models/model"));
//patch by id
const patchTransaction = (req, res) => {
    const currTransaction = model_1.default;
    let success = false;
    for (let i = 0; i < currTransaction.length; i++) {
        if (currTransaction[i].id == +req.params.id) {
            const currentData = currTransaction[i];
            if (req.body.id) {
                currTransaction[i].id = req.body.id;
            }
            ;
            if (req.body.type) {
                currTransaction[i].type = req.body.type;
            }
            ;
            if (req.body.name) {
                currTransaction[i].name = req.body.name;
            }
            ;
            if (req.body.detail) {
                currTransaction[i].detail = req.body.detail;
            }
            ;
            if (req.body.amount) {
                currTransaction[i].amount = req.body.amount;
            }
            ;
            success = true;
            res.status(200).json({
                message: "success updating data", currentData
            });
        }
    }
    if (success == false) {
        res.status(404).send("Error: ID not found");
    }
};
exports.default = patchTransaction;
