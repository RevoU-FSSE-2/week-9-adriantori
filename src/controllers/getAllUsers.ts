import { Request, Response, query } from "express";
import mySqlQuery from "./mySqlQuery";

const getAllUsers = (req: Request, res: Response) => {
    (async () => {
        try {
            const query = 'SELECT * FROM user';
            const response = await mySqlQuery(query);
            res.status(response.statusCode).send(response.result);
        } catch (error) {
            res.send(error);
        }
    })();
};

export default getAllUsers;