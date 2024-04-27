import express from "express"
import contactRouter from "./contactRouter.js"
import userRouter from "./userRouter.js"
import articleRouter from "./articleRouter.js"
import folderRouter from "./folderRouter.js"
import flashcardRouter from "./flashcardRouter.js"
import resultRouter from "./resultRouter.js"

const router = express.Router()

// ROUTES
router.use("/contacts", contactRouter)
router.use("/users", userRouter)
router.use("/articles", articleRouter)
router.use("/folders", folderRouter)
router.use("/flashcards", flashcardRouter)
router.use("/results", resultRouter)


export default router