import express from 'express';
import { isLogged , isAuthorized } from '../middlewares/auth.js'
import { addContact , updateContactStatus , getAllContact , getOneContact , deleteContact } from '../controllers/contactController.js'

const contactRouter = express.Router();


// ROUTES
contactRouter.get("/getall", isLogged, isAuthorized(["admin"]), getAllContact)
contactRouter.get("/getone/:id", isLogged, isAuthorized(["admin"]), getOneContact)
contactRouter.post("/new", addContact)
contactRouter.put("/update/:id", isLogged, isAuthorized(["admin"]),  updateContactStatus)
contactRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteContact)


export default contactRouter
