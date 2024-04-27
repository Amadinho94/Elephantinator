import express from 'express';
import {createFolder, updateFolder, getAllUserFolder, getOneUserFolder, deleteOneFolder} from '../controllers/folderController.js';
import {isLogged} from '../middlewares/auth.js'


const folderRouter = express.Router();

// ROUTES
folderRouter.post("/create/:userId", isLogged, createFolder)
folderRouter.put("/update/:id", isLogged, updateFolder)
folderRouter.get("/getall/:userId", isLogged, getAllUserFolder)
folderRouter.get("/getone/:folderId", isLogged, getOneUserFolder)
folderRouter.delete("/delete/:id", isLogged, deleteOneFolder)





export default folderRouter

