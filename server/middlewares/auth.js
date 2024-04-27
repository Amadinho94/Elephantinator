import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/userModel.js'

dotenv.config()

// USER LOGGED VERIFICATION MIDDLEWARE
export const isLogged = (req, res, next) => {
    
    const fullToken = req.headers.authorization
    
    const userToken = fullToken && fullToken.split(" ")[1]
    
    if (!userToken) {
        return res.status(401).json({message : "You aren't logged"})
    }
    
    jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message : "Wrong token"})
        }
        
        req.userId = decoded.id
        next()
    })
}


// API ROUTE ACCESS AUTHORIZATION MIDDLEWARE
export const isAuthorized = (roles) => {
    
    return async (req, res, next) => {
        
        const user = await User.findById(req.userId)
        
        if (!user) {
            return res.status(404).json({message : "User not found"})
        } else if (!roles.includes(user.role)) {
            return res.status(403).json({message : "Access denied"})
        }
        
        next()
    }
}
