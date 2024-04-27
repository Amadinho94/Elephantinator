import User from "../models/userModel.js";
import Folder from '../models/folderModel.js'
import Flashcard from '../models/flashcardModel.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()


// NEW USER REGISTRATION CONTROLLER
export const register = async (req, res) => {
    
    try {
        
        const {name, username, email, password} = req.body
        
        if (name.trim() === ""
        || username.trim() === ""
        || email.trim() === ""
        || password.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        }
        
        // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (name.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un prénom plus grand"})
        } else if (name.length > 25) {
            return res.status(400).json({message : "Veuillez saisir un prénom plus petit"})
        } else if (username.length < 4) {
            return res.status(400).json({message : "Veuillez choisir un nom d'utilisateur plus grand"})
        } else if (username.length > 25) {
            return res.status(400).json({message : "Veuillez choisir un nom d'utilisateur plus petit"})
        } else if (email.length > 35) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus petite"})
        } else if (!checkEmail.test(email)) {
            return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
        } else if (!checkPassword.test(password)) {
            return res.status(401).json({message : "Votre mot de passe n'est pas assez sécurisé"})
        }
        
        const usernameAlreadyTaken = await User.findOne({username})
        const emailAlreadyTaken = await User.findOne({email})
        
        if (usernameAlreadyTaken) {
            return res.status(401).json({message : "Ce nom d'utilisateur est déjà utilisé"})
        } else if (emailAlreadyTaken) {
            return res.status(401).json({message : "Cet adresse email est déjà utilisé"})
        } 
        
        
        
        
        const newUser = new User({
            name,
            username,
            email,
            password,
            profilPicture : req.file && req.file.filename
        })
        
        const salt = await bcrypt.genSalt(10)
        
        newUser.password = await bcrypt.hash(password , salt)
        
        await newUser.save()
        
        res.status(200).json({message : "Inscription réussi"})
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message : "Impossible de procéder à votre inscription"})
    }
}

// USER LOGIN CONTROLLER
export const login = async (req, res) => {
    
    try {
        
        const {email, password} = req.body
        
        
        if (email.trim() === ""
        || password.trim() === "") {
            return res.status(401).json({message : "Veuillez remplir tout les champs"})
        }
        
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (email.length > 35) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus petite"})
        } else if (!checkEmail.test(email)) {
            return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
        } else if (!checkPassword.test(password)) {
            return res.status(401).json({message : "Mot de passe invalide"})
        }
        
        const oneUser = await User.findOne({email})
        
        if (!oneUser) {
            return res.status(404).json({message : "Aucun utilisateur trouvé avec cet adresse email"})
        }
        
        const validPassword = bcrypt.compareSync(password, oneUser.password)
        
        if (!validPassword) {
            return res.status(401).json({message : "Mot de passe incorrect"})
        }
        
        const userToken = jwt.sign({id : oneUser.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION})
        
        
        res.status(200).json({
            _id : oneUser._id,
            username : oneUser.username,
            role : oneUser.role,
            email : oneUser.email,
            userToken
        })
        
    } catch (e) {
        res.status(401).json({message : "Erreur survenue lors de la connexion"})
    }
}

// GET ALL USERS CONTROLLER
export const getAllUsers = async (req, res) => {
    
    try {
        
        const allUsers = await User.find({}).select("-password")
        
        res.status(200).json(allUsers)
    } catch (e) {
        res.status(400).json({message : "Echec de la récupération des utilisateurs"})
    }
}

// GET ONE USER CONTROLLER
export const getOneUser = async (req, res) => {
    
    
    try {
        const {id} = req.params
        const currentUser = await User.findById(req.userId)
        const requestedUser = await User.findById(id).select("-password")
        
        // if (currentUser.role !== "admin" && requestedUser.role === "admin") {
        //     return res.status(200).json({message : "Access denied"})
        // }
        
        if (currentUser.role !== "admin" && requestedUser.id !== req.userId) {
            return res.status(200).json({message : "Accès refusé"})
        }
        
        res.status(200).json(requestedUser)
    } catch (e) {
        res.status(400).json({message : "Impossible d'afficher le profil"})
    }
}

// DELETE ONE USER CONTROLLER
export const deleteOneUser = async (req, res) => {
    
    try {
        
        const {id} = req.params
        const userToDelete = await User.findById(id)
        
        if (userToDelete && userToDelete.id === req.userId) {
            return res.status(400).json({message : "Un admin ne peut pas supprimer son propre compte"})
        }
        
        await User.findByIdAndDelete(id)
        await Folder.deleteMany({userId : id})
        await Flashcard.deleteMany({userId : id})
        
        
        res.status(200).json({message : "Compte supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message : "Echec de la suppression du compte"})
    }
}

// UPDATE USER STATUS
export const updateUserStatus = async (req, res) => {
    
    try {
        
        const {id} = req.params
        const {role} = req.body
        
        if (role !== "admin"
        && role !== "user") {
            return res.status(400).json({message : "Veuillez choisir un role utilisateur valide"})
        }
        
        const user = await User.findById(id)
        
        if (role === user.role) {
            return res.status(400).json({message : "Cet utilisateur à déjà ce role"})
        }
        
        const newRole = {
            role,
        }
        
        await User.findByIdAndUpdate(id, newRole)
        
        res.status(200).json({message : "Role mis à jour avec succès"})
    } catch (e) {
        res.status(401).json({message : "Echec de la mise à jour du role"})
    }
}

// RESET USER PASSWORD
export const resetUserPassword = async (req, res) => {
    
    try {
        
        const {id} = req.params
        const {newPWD, previousPWD} = req.body
        
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
        
        if (newPWD.trim() === ""
        || previousPWD.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        } else if (!checkPassword.test(previousPWD)) {
            return res.status(400).json({message : "Mot de passe invalide"})
        }
        
        const user = await User.findById(req.userId)
        
        const validPassword = await bcrypt.compareSync(previousPWD, user.password)
        
        if (!validPassword) {
            return res.status(401).json({message : "Mot de passe actuel incorrect"})
        }
        
        if (!checkPassword.test(newPWD)) {
            return res.status(400).json({message : "Veuillez choisir un mot de passe plus sécurisé"})
        } else if (newPWD === previousPWD) {
            return res.status(400).json({message : "Veuillez choisir un nouveau mot de passe différent"})
        }
        
        
        const newPassword = {
            password : newPWD
        }
        
        const salt = await bcrypt.genSalt(10)
        newPassword.password = await bcrypt.hash(newPWD, salt)
        
        
        await User.findByIdAndUpdate(id, newPassword)
        
        res.status(200).json({message : "Mot de passe mis à jour avec succès"})
    } catch (e) {
        console.log(e)
        res.status(401).json({message : "Impossible de mettre à jour le mot de passe"})
    }
}

// UPDATE USER PROFIL
export const updateUserProfil = async (req, res) => {
    
    try {
        
        const {name, username, email} = req.body
        
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        
        const updateProfil = {};
        
        if (name && name.trim() !== "") {
            if (name.length < 2) {
                return res.status(400).json({message : "Veuillez saisir un prénom plus grand"})
            } else if (name.length > 25) {
                return res.status(400).json({message : "Veuillez saisir un prénom plus petit"})
            }
            updateProfil.name = name
        }
        
        if (email && email.trim() !== "") {
            if (!checkEmail.test(email)) {
                return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
            }
            
            const emailAlreadyTaken = await User.findOne({email})
            
            if (emailAlreadyTaken && emailAlreadyTaken.id !== req.userId) {
                return res.status(401).json({message : "Cet adresse email est déjà utilisé"})
            }
            updateProfil.email = email
        }
        
        if (username && username.trim() !== "") {
            
            if (username.length < 4) {
                return res.status(400).json({message : "Veuillez choisir un nom d'utilisateur plus grand"})
            } else if (username.length > 25) {
                return res.status(400).json({message : "Veuillez choisir un nom d'utilisateur plus petit"})
            }
            
            const usernameAlreadyTaken = await User.findOne({username})
            
            if (usernameAlreadyTaken && usernameAlreadyTaken.id !== req.userId) {
                return res.status(401).json({message : "Ce nom d'utilisateur est déjà utilisé"})
            }
            updateProfil.username = username
        }
        
        if (req.file && req.file.filename.trim() !== "") {
            updateProfil.profilPicture = req.file.filename
        }
        
        const thisUser = await User.findById(req.userId)
        
        if (thisUser.name === name
        && thisUser.username === username
        && thisUser.email === email
        && !req.file
        ) {
            return res.status(400).json({message : "Aucun changement opéré"})
        }
        
        await User.findByIdAndUpdate(req.userId, updateProfil)
        
        res.status(200).json({message : "Profil bien mis à jour"})
    } catch (e) {
        res.status(401).json({message : "Impossible de mettre à jour le profil"})
    }
}

// AUTHENTIFICATION CONTROLLER
export const checkUser = async (req, res) => {
    
    try {
        
        const user = await User.findById(req.userId).select("-password")
        res.status(200).json(user)
        
    } catch (e) {
        res.status(400).json({message : "Erreur lors de l'authentification"})
    }
}