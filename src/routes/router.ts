import { Router } from "express";

import helloWorld from "../controllers/helloWorld.js"
import getAllTransaction from "../controllers/getAllTransaction";
import postTransaction from "../controllers/postTransaction";
import deleteTransaction from "../controllers/deleteTransaction";
import putTransaction from "../controllers/putTransaction";
import pageNotFound from "../controllers/pageNotFound";
import getAllUsers from "../controllers/getAllUsers.js";
import getUserId from "../controllers/getUserId.js";

export const router = Router();

//hello
router.get('/', helloWorld);

//get transaction by user ID
router.get('/user/:id', getUserId)

//push transaction
router.post('/transaction', postTransaction);

//put by id
router.put('/transaction/:id', putTransaction);

//delete transaction by id
router.delete('/transaction/:id', deleteTransaction);


//checking data
//getAllTransaction
router.get('/transaction', getAllTransaction);

//get all users
router.get('/users', getAllUsers);


//page not found
router.get("*", pageNotFound);