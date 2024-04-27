import express from 'express'
import {createFlashcard, getOneUserFlashcard, updateFlashcard, getAllUserFlashcards, deleteOneFlashcard} from '../controllers/flashcardController.js'
import {isLogged} from '../middlewares/auth.js'


const flashcardRouter = express.Router()


// ROUTES
flashcardRouter.post("/create/:folderId", isLogged, createFlashcard)
flashcardRouter.put("/update/:id", isLogged, updateFlashcard)
flashcardRouter.get("/getall/:folderId", isLogged, getAllUserFlashcards)
flashcardRouter.get("/getone/:flashcardId", isLogged, getOneUserFlashcard)
flashcardRouter.delete("/delete/:id", isLogged, deleteOneFlashcard)



export default flashcardRouter