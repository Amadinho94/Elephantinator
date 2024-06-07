import Contact from '../models/contactModel.js'


// NOUVEAU CONTACT
export const addContact = async (req, res) => {
    
    try {
        
        const {username, email, subjectMessage, message} = req.body
        
        const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        if (username.trim() === ""
        || email.trim() === ""
        || message.trim() === ""
        ) {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        } else if (subjectMessage.trim() === "") {
            return res.status(400).json({message : "Veuillez sélectionner l'objet du message"})
        } else if (username.length < 2) {
            return res.status(400).json({message : "Veuillez saisir un prénom plus long"})
        } else if (email.length < 5) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus longue"})
        } else if (username.length > 25) {
            return res.status(400).json({message : "Veuillez saisir un prénom plus court"})
        } else if (email.length > 35) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus courte"})
        } else if (subjectMessage.toLowerCase() !== "utilisation"
        && subjectMessage.toLowerCase() !== "paiement"
        && subjectMessage.toLowerCase() !== "autres"
        ) {
            return res.status(400).json({message : "objet du message invalide"})
        } else if (!checkEmail.test(email)) {
            return res.status(400).json({message : "Veuillez saisir une adresse email valide"})
        } else if (message.length < 10) {
            return res.status(400).json({message : "Veuillez saisir un message plus long"})
        } else if (message.length > 3000) {
            return res.status(400).json({message : "Veuillez saisir un message plus court"})
        } else if (email.length > 35) {
            return res.status(400).json({message : "Veuillez saisir une adresse email plus courte"})
        }
        
        
        const newMessage = new Contact({
            username,
            email,
            subjectMessage,
            message
        })
        
        await newMessage.save()
        
        res.status(200).json({message : "Message envoyé avec succès"})
        
    } catch (e) {
        res.status(400).json({message : "Impossible d'envoyer le message"})
    }
}


// METTRE A JOUR LE STATUS D'UN CONTACT
export const updateContactStatus = async (req, res) => {
    
    try {
        
        const {id} = req.params
        const {status} = req.body
        
        if (status.trim() === "") {
            return res.status(400).json({message : "Veuillez définir un status pour ce contact"})
        } else if (status != "in progress" && status != "completed") {
            return res.status(400).json({message : "Veuillez définir un status valide pour ce contact"})
        }
        
        const editContactStatus = {
            status
        }
        
        await Contact.findByIdAndUpdate(id, editContactStatus)
        
        res.status(200).json({message : "Status du contact bien mis à jour"})
        
    } catch (e) {
        
        res.status(400).json({message : "Impossible de mettre à jour le status du contact"})
    }
}


// RECUPERER TOUT LES CONTACTS
export const getAllContact = async (req, res) => {
    
    try {
        
        const contacts = await Contact.find({})
        
        res.status(200).json(contacts)
        
    } catch (e) {
        res.status(400).json({message : "Echec dans la récupération des contacts"})
    }
}


// RECUPERER UN CONTACT
export const getOneContact = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        const oneContact = await Contact.findById(id)
        
        res.status(200).json(oneContact)
    } catch (e) {
        res.status(400).json({message : "Echec dans la récupération du contact"})
    }
}


// SUPPRIMER UN CONTACT
export const deleteContact = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        await Contact.findByIdAndDelete(id)
        
        res.status(200).json({message : "Contact supprimé avec succès"})
    } catch (e) {
        res.status(200).json({message : "Echec lors de la suppression du contact"})
    }
}