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
const mySqlQuery_1 = __importDefault(require("./mySqlQuery"));
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisConn = new ioredis_1.Redis({
    username: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASS || '',
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT
});
//get transaction by id
const getUserId = (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const userKey = "user:" + req.params.id;
        const cacheData = yield redisConn.hgetall(userKey);
        if (Object.keys(cacheData).length !== 0) {
            const cacheDataFormat = {
                "id": +cacheData.id,
                "name": cacheData.name,
                "address": cacheData.address,
                "balance": +cacheData.balance,
                "expense": +cacheData.expense
            };
            res.status(200).send(cacheDataFormat);
        }
        else {
            try {
                const query = `
                SELECT u.id, u.name, u.address,
                    (
                        SELECT
                            SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END) AS net_amount
                        FROM \`transaction\` t
                        WHERE t.user_id = u.id
                    ) AS balance,
                    (
                        SELECT SUM(t.amount)
                        FROM \`transaction\` t
                        WHERE t.user_id = u.id AND t.\`type\` = 'expense'
                    ) AS expense
                FROM \`user\` u
                WHERE u.id = ${req.params.id};
                `;
                const response = yield (0, mySqlQuery_1.default)(query);
                const row = response.result[0];
                if (row.length !== 0 || row !== undefined) {
                    yield redisConn.hset(userKey, row);
                    yield redisConn.expire(userKey, 60);
                    res.status(response.statusCode).send(row);
                }
                else {
                    res.status(404).send("Data not found / empty");
                }
            }
            catch (error) {
                res.send(error);
            }
        }
    }))();
};
exports.default = getUserId;
