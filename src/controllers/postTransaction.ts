import { Request, Response } from "express";
import mySqlQuery from "./mySqlQuery";

//push transaction
const postTransaction = (req: Request, res: Response) => {
    if (req.body.type == null || req.body.amount == null || req.body.user_id == null) {
        res.status(406).send("One of the field cannot empty");
    } else {
        const { type, amount, user_id } = req.body;
        (async () => {
            try {
                const query = `
                    INSERT INTO revou_w9.\`transaction\`
                    (user_id, \`type\`, amount)
                    VALUES(${user_id}, '${type}', ${amount});
                `;
                const response = await mySqlQuery(query);
                res.status(response.statusCode).send(`id: ${response.resultId}`);
            } catch (error) {
                res.send(error);
            }
        })();
    }
};

export default postTransaction;
