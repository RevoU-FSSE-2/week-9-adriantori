"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
function mySqlQuery(query) {
    return new Promise((resolve, reject) => {
        const con = mysql2_1.default.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB,
            port: +process.env.SQL_PORT
        });
        con.connect((err) => {
            if (err) {
                reject({ error: err.message, statusCode: 400 }); // Use err.message to get the error message
            }
            else {
                console.log("Connected to Database");
                con.query(query, (err, result, fields) => {
                    con.end(); // Close the connection after querying
                    if (err) {
                        reject({ error: err.message, statusCode: 404 });
                    }
                    else {
                        resolve({ result, statusCode: 200, resultId: result.insertId, affectedRows: result.affectedRows });
                    }
                });
            }
        });
        con.on('error', (err) => {
            reject({ error: err, statusCode: 503 }); // Use err.message to get the error message
        });
    });
}
exports.default = mySqlQuery;
