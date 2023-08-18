import { Request, Response, Router } from "express";
import mySqlQuery from "./mySqlQuery";
import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisConn = new Redis({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT!
})


//get transaction by id
const getUserId = (req: Request, res: Response) => {
    (async () => {
        const userKey = "user:"+req.params.id;
        const cacheData = await redisConn.hgetall(userKey);
        if(Object.keys(cacheData).length !== 0){
            const cacheDataFormat:JSON = <JSON><unknown>{
                "id":+cacheData.id,
                "name":cacheData.name,
                "address":cacheData.address,
                "balance":+cacheData.balance,
                "expense":+cacheData.expense
            }
            res.status(200).send(cacheDataFormat);
        }else{
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
                const response = await mySqlQuery(query);
                const row = response.result![0];
                if(row.length !== 0 || row !== undefined){
                    await redisConn.hset(userKey,row);
                    await redisConn.expire(userKey, 60);

                    res.status(response.statusCode).send(row);
                }else{
                    res.status(404).send("Data not found / empty");
                }

            } catch (error) {
                res.send(error);
            }
        }
    })();

};

export default getUserId;
