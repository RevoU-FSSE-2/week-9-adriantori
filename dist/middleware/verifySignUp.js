"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const checkDuplicateName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currUsers = user_1.default;
        let success = false;
        for (let i = 0; i < currUsers.length; i++) {
            if (currUsers[i].name !== req.params.name) {
                success = true;
                return res.send(currUsers[i]);
            }
        }
        if (success == false) {
            return res.send("Error: Data not found");
        }
        next();
    }
    catch (err) {
        return res.send(err);
    }
});
const verifySignUp = {
    checkDuplicateName
};
module.exports = verifySignUp;
