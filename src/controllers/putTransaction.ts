import { Request, Response } from "express";
import mySqlQuery from "./mySqlQuery";

//put by id
const putTransaction = (req: Request, res: Response) => {
    if (req.body.type == null || req.body.amount == null || req.body.user_id == null) {
        res.status(406).send("One of the field cannot empty");
    } else {
        const { type, amount, user_id } = req.body;
        (async () => {
            try {
                const query = `
                    UPDATE \`transaction\`
                    SET user_id=${user_id}, \`type\`='${type}', amount=${amount}
                    WHERE id=${req.params.id};
                `;
                const response = await mySqlQuery(query);
                if(response.affectedRows !== 0){
                    res.status(response.statusCode).send(`id: ${req.params.id}`);
                }else{
                    res.status(404).send("Transaction not found");
                }
            } catch (error) {
                res.send(error);
            }
        })();
    }
};

export default putTransaction;
