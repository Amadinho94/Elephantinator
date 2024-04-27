import express from 'express';
import {createResult, getMostRecentResults, deleteAllResults, deleteFolderResults, deleteOneResult, getAllFolderResults, getOneResult, getAllResults} from '../controllers/resultController.js'
import {isAuthorized, isLogged} from '../middlewares/auth.js'


const resultRouter = express.Router();

// ROUTES
resultRouter.post("/create/:folderId", isLogged, createResult)
resultRouter.get("/getalluserresults/:userId", isLogged, getAllResults)
resultRouter.get("/getallfolderresults/:folderId", isLogged, getAllFolderResults)
resultRouter.get("/getoneresult/:resultId", isLogged, getOneResult)
resultRouter.delete("/deleteoneresult/:resultId", isLogged, deleteOneResult)
resultRouter.delete("/deleteallfolderresults/:folderId", isLogged, deleteFolderResults)
resultRouter.delete("/deleteallresults/:userId", isLogged, deleteAllResults)
resultRouter.get("/getrecentresults/:userId", isLogged, getMostRecentResults)


export default resultRouter