import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

dotenv.config()

// Vérification du token
export const isLogged = (req, res, next) => {
    
    const fullToken = req.headers.authorization
    
    const userToken = fullToken && fullToken.split(" ")[1]
    
    if (!userToken) {
        
        return res.status(401).json({message : "Vous n'êtes pas connecté"})
        
    }
    
    jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            
            return res.status(403).json({message : "Token invalide ou expiré"})
        
        }
        
        req.userId = decoded.id
        next()
        
    })
}


// Vérification du role de l'utilisateur pour autorisation d'accès à une ressource
export const isAuthorized = (roles) => {
    
    return async (req, res, next) => {
        
        const user = await User.findById(req.userId)
        
        if (!user) {
            return res.status(404).json({message : "Utilisateur introuvable"})
        } else if (!roles.includes(user.role)) {
            return res.status(403).json({message : "Vous n'êtes pas autorisé"})
        }
        
        next()
    }
}
