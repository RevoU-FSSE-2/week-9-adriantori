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
const redisConn = new ioredis_1.Redis({
    host: '127.0.0.1',
    port: 6379
});
//get transaction by id
const getTransactionById = (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const userKey = `"user:${req.params.id}"`;
        const cacheData = yield redisConn.hgetall(userKey);
        if (Object.keys(cacheData).length !== 0) {
            res.status(200).send(cacheData);
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
                WHERE u.id = '${req.params.id}';
                `;
                const response = yield (0, mySqlQuery_1.default)(query);
                const row = response.result[0];
                const rowData = Object.assign({}, row);
                yield redisConn.hset(userKey, rowData);
                yield redisConn.expire(userKey, 60);
                res.status(response.statusCode).send(response.result[0]);
            }
            catch (error) {
                res.send(error);
            }
        }
    }))();
};
exports.default = getTransactionById;
