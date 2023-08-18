import { Request, Response, Router } from "express";
import mySqlQuery from "./mySqlQuery";
import { Redis } from "ioredis";

const redisConn = new Redis({
    host: '127.0.0.1',
    port: 6379
});


//get transaction by id
const getTransactionById = (req: Request, res: Response) => {
    (async () => {
        const userKey = `"user:${req.params.id}"`
        const cacheData = await redisConn.hgetall(userKey);

        if (Object.keys(cacheData).length !== 0) {
            res.status(200).send(cacheData);
        } else {
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
                const response = await mySqlQuery(query);
                
                const row = response.result![0];
                const rowData = Object.assign({}, row);

                await redisConn.hset(userKey, rowData);
                await redisConn.expire(userKey, 60);
                
                
                res.status(response.statusCode).send(response.result![0]);
            } catch (error) {
                res.send(error);
            }
        }
    })();
};

export default getTransactionById;
