import { Request, Response } from "express";
import mySqlQuery from "./mySqlQuery";

//delete transaction by id
const deleteTransaction = (req: Request, res: Response) => {
    (async () => {
        try {
            const query = `
                DELETE FROM revou_w9.\`transaction\`
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
};

export default deleteTransaction;
