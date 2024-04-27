import express from 'express'
import {createArticle, editArticle, getAllArticle, getOneArticle, deleteOneArticle} from '../controllers/articleController.js'
import uploadArticleImage from '../middlewares/articleImgMulter.js'
import {isAuthorized, isLogged} from '../middlewares/auth.js'

const articleRouter = express.Router();


// ROUTES
articleRouter.post("/newarticle", isLogged, isAuthorized(["admin"]), uploadArticleImage.single("articleImage"), createArticle)

articleRouter.put("/editarticle/:id", isLogged, isAuthorized(["admin"]), uploadArticleImage.single("articleImage"), editArticle)
articleRouter.get("/getallarticle", getAllArticle)
articleRouter.get("/getonearticle/:id", getOneArticle)
articleRouter.delete("/deleteonearticle/:id", isLogged, isAuthorized(["admin"]), deleteOneArticle)


export default articleRouter