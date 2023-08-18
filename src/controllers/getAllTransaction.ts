import { Request, Response } from "express";
import mySqlQuery from "./mySqlQuery";


//get all transaction
const getAllTransaction = (req: Request, res: Response) => {
    (async () => {
        try {
            const query = 'SELECT * FROM transaction';
            const response = await mySqlQuery(query);
            res.status(response.statusCode).send(response.result);
        } catch (error) {
            res.send(error);
        }
    })();
};

export default getAllTransaction;
