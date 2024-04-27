import Article from '../models/articleModel.js'


// CREATE ARTICLE CONTROLLER
export const createArticle = async (req, res) => {
    
    try {
        
        const {title, authorName, summary, paragraphs} = req.body
        
        if (title.trim() === ""
        || authorName.trim() === ""
        || summary.trim() === ""
        || paragraphs.trim() === ""
        || !req.file
        ) {
           return res.status(400).json({message : "Veuillez remplir tout les champs"}) 
        } else if (title.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un titre plus long"}) 
        } else if (title.length > 100) {
            return res.status(400).json({message : "Veuillez saisir un titre plus court"}) 
        } else if (authorName.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un nom d'auteur plus long"}) 
        } else if (authorName.length > 25) {
            return res.status(400).json({message : "Veuillez saisir un nom d'auteur plus court"}) 
        } else if (summary.length < 150) {
            return res.status(400).json({message : "Veuillez saisir un résumé plus long"}) 
        } else if (summary.length > 1000) {
            return res.status(400).json({message : "Veuillez saisir un résumé plus court"}) 
        } else if (paragraphs.length < 150) {
            return res.status(400).json({message : "Veuillez saisir un contenu plus long"}) 
        } else if (paragraphs.length > 10000) {
            return res.status(400).json({message : "Veuillez saisir un contenu plus court"}) 
        }
        
        const titleAlreadyTaken = await Article.findOne({title})
        
        if (titleAlreadyTaken) {
            return res.status(401).json({message : "Ce titre est déjà utilisé pour un autre article"})
        } 
        
        const newArticle = new Article({
            title,
            authorName,
            summary,
            paragraphs,
            articleImage : req.file.filename
        })
        
        await newArticle.save()
        
        res.status(200).json({message : "Article créé avec succès"})
    } catch (e) {
        res.status(400).json({message : "Echec lors de la création de l'article"})
    }
}

// EDIT ARTICLE CONTROLLER
export const editArticle = async (req, res) => {
    
    try {
        
        const {id} = req.params
        const {title, authorName, summary, paragraphs} = req.body
        
        
        const editArticle = {};
        
        // const articles = await Article.find({})
        
        if (authorName && authorName.trim() !== "") {
            if (authorName.length < 2) {
                return res.status(400).json({message : "Veuillez saisir un nom d'auteur plus long"}) 
            } else if (authorName.length > 25) {
                return res.status(400).json({message : "Veuillez saisir un nom d'auteur plus court"}) 
            }
            editArticle.authorName = authorName
        }
        
        if (summary && summary.trim() !== "") {
            if (summary.length < 150) {
                return res.status(400).json({message : "Veuillez saisir un résumé plus long"}) 
            } else if (summary.length > 1000) {
                return res.status(400).json({message : "Veuillez saisir un résumé plus court"}) 
            }
            editArticle.summary = summary
        } 
        
        if (paragraphs && paragraphs.trim() !== "") {
            if (paragraphs.length < 150) {
                return res.status(400).json({message : "Veuillez saisir un contenu plus long"}) 
            } else if (paragraphs.length > 10000) {
                return res.status(400).json({message : "Veuillez saisir un contenu plus court"}) 
            }
            editArticle.paragraphs = paragraphs
        }
        
        if (req.file && req.file.filename.trim() !== "") {
            editArticle.articleImage = req.file.filename
        }
        
        
        
        if (title && title.trim() !== "") {
            if (title.length < 2) {
                return res.status(400).json({message : "Veuillez saisir un titre plus long"}) 
            } else if (title.length > 100) {
                return res.status(400).json({message : "Veuillez saisir un titre plus court"}) 
            } 
            
            const sameTitleArticle = await Article.findOne({title})
            
            
            if (sameTitleArticle && sameTitleArticle.id !== id) {
                return res.status(401).json({message : "Ce titre est déjà utilisé pour un autre article"})
            }
            editArticle.title = title
        }
        
        
        
        
        await Article.findByIdAndUpdate(id, editArticle)
        
        res.status(200).json({message : "Article bien mis à jour"})
    } catch (e) {
        res.status(400).json({message : "Impossible de mettre à jour l'article"})
    }
}

// GET ALL ARTICLE CONTROLLER
export const getAllArticle = async (req, res) => {
    
    try {
        
        const allArticles = await Article.find({})
        
        res.status(200).json(allArticles)
    } catch (e) {
        res.status(400).json({message : "Impossible d'afficher les articles"})
    }
}

// GET ONE ARTICLE CONTROLLER
export const getOneArticle = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        const oneArticle = await Article.findById(id)
        
        res.status(200).json(oneArticle)
    } catch (e) {
        res.status(400).json({message : "Impossible d'afficher l'article"})
    }
}

// DELETE ONE ARTICLE CONTROLLER
export const deleteOneArticle = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        await Article.findByIdAndDelete(id)
        
        res.status(200).json({message : "Article supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message : "Impossible de supprimer l'article"})
    }
}