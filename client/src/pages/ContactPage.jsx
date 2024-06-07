import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useAuth} from '../context/AuthContext'

const ContactPage = () => {
    
    const {user} = useAuth()
    
    const [inputValue, setInputValue] = useState({
        username : "",
        email :"",
        subjectMessage : "",
        message : ""
    })
    const [invalidName, setInvalidName] = useState("")
    const [invalidEmail, setInvalidEmail] = useState("")
    const [invalidMessage, setInvalidMessage] = useState("")
    
    
    useEffect(() => {
        scrollTo(0,0)
        
        setInputValue({
            username : user && user.name,
            email : user && user.email,
            subjectMessage : "",
            message : ""
        })
        
    }, [user])
    
    
    /* Fonction qui change la valeur des states en fonction de la valeur des champs */
    const handleChange = (e) => {
        setInvalidEmail("")
        setInvalidName("")
        setInvalidMessage("")
        const {name, value} = e.target
        
        if (user && user.userToken) {
            if (name === "subjectMessage"
            || name === "message") {
               setInputValue({...inputValue, [name] : value}) 
            }
        } else {
            setInputValue({...inputValue, [name] : value})
        }
        
        
    }
    
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
         e.preventDefault()
         
            
        try {
            
             const {username, email, subjectMessage, message} = inputValue
             const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                     
             if (email.trim() === ""
                || username.trim() === ""
                || message.trim() === ""
             ) {
                setInvalidName("invalid-value")
                setInvalidEmail("invalid-value")
                setInvalidMessage("invalid-textarea")
                return toast.error("Veuillez remplir tout les champs")
             } else if (subjectMessage.trim() === "") {
                 return toast.error("Veuillez sélectionner l'objet du message")
             } else if (username.length < 2) {
                 setInvalidName("invalid-value")
                 return toast.error("Veuillez saisir un prénom plus long")
             } else if (username.length > 25) {
                 setInvalidName("invalid-value")
                 return toast.error("Veuillez saisir un prénom plus court")
             } else if (!checkEmail.test(email)) {
                 setInvalidEmail("invalid-value")
                 return toast.error("Veuillez saisir une adresse email valide")
             } else if (email.length > 35) {
                 setInvalidEmail("invalid-value")
                 return toast.error("Veuillez saisir une adresse email plus courte")
             } else if (email.length < 5) {
                 setInvalidEmail("invalid-value")
                 return toast.error("Veuillez saisir une adresse email plus longue")
             } else if (subjectMessage.toLowerCase() !== "utilisation"
             && subjectMessage.toLowerCase() !== "paiement"
             && subjectMessage.toLowerCase() !== "autres"
             ) {
                 return toast.error("objet du message invalide")
             } else if (message.length < 10) {
                 setInvalidMessage("invalid-textarea")
                 return toast.error("Veuillez saisir un message plus long")
             } else if (message.length > 3000) {
                 setInvalidMessage("invalid-textarea")
                 return toast.error("Veuillez saisir un message plus cours")
             }
             
             const serverRes = await axios.post('/api/contacts/new', inputValue)
             
             
             setInputValue({
                username : user && user.name,
                email : user && user.email,
                subjectMessage : "",
                message : ""
             })
             
             return toast.success(serverRes.data.message)
             
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }

        
    }
    
    
    return (
        <main className="contactpage-main">
        
            {/******* Contenu principal *******/}
            <article className="contactpage-article">
            
                <h1 className="contactpage-title">Formulaire de contact</h1>
                <p>Vous avez une question ? Dîtes-nous tout</p>
                
                {/******** Formulaire ********/}
                <form onSubmit={handleSubmit}>
                  
                  <fieldset className={`contactpage-input-label ${invalidName}`}>
                    <input onChange={handleChange} value={inputValue.username} name="username" type="text" className="contactpage-input" required />
                    <label htmlFor="username" >Votre prénom</label>
                  </fieldset>
                  
                  <fieldset className={`contactpage-input-label ${invalidEmail}`}>
                    <input onChange={handleChange} value={inputValue.email} name="email" type="text" className="contactpage-input" required />
                    <label htmlFor="email" >Votre adresse email</label>
                  </fieldset>
                  
                  <label className="contactpage-select-label">Objet de votre message</label>
                  <select onChange={handleChange} name="subjectMessage" value={inputValue.subjectMessage} className="contactpage-select">
                      <option defaultValue> --- </option>
                      <option value="utilisation"> Utilisation </option>
                      <option value="paiement"> Paiement </option>
                      <option value="autres"> Autres </option>
                  </select>
                  
                   <textarea onChange={handleChange} value={inputValue.message} name="message" type="text" className={`contactpage-textarea ${invalidMessage}`} placeholder="Votre message" required />
                    
                  <button type="submit" className="contactpage-form-button"> Envoyer </button>
                
                </form>
                
            </article>
            
        </main>
    )
}

export default ContactPage