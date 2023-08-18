"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const helloWorld_js_1 = __importDefault(require("../controllers/helloWorld.js"));
const getAllTransaction_1 = __importDefault(require("../controllers/getAllTransaction"));
const postTransaction_1 = __importDefault(require("../controllers/postTransaction"));
const deleteTransaction_1 = __importDefault(require("../controllers/deleteTransaction"));
const putTransaction_1 = __importDefault(require("../controllers/putTransaction"));
const pageNotFound_1 = __importDefault(require("../controllers/pageNotFound"));
const getAllUsers_js_1 = __importDefault(require("../controllers/getAllUsers.js"));
const getUserId_js_1 = __importDefault(require("../controllers/getUserId.js"));
exports.router = (0, express_1.Router)();
//hello
exports.router.get('/', helloWorld_js_1.default);
//get transaction by user ID
exports.router.get('/user/:id', getUserId_js_1.default);
//push transaction
exports.router.post('/transaction', postTransaction_1.default);
//put by id
exports.router.put('/transaction/:id', putTransaction_1.default);
//delete transaction by id
exports.router.delete('/transaction/:id', deleteTransaction_1.default);
//checking data
//getAllTransaction
exports.router.get('/transaction', getAllTransaction_1.default);
//get all users
exports.router.get('/users', getAllUsers_js_1.default);
//page not found
exports.router.get("*", pageNotFound_1.default);
