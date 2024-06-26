import {NavLink, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {toast} from "react-toastify"
import axios from 'axios'
import {useAuth} from '../context/AuthContext'
import { User, Lock , Eye , EyeOff } from 'lucide-react'


const LogInPage = () => {
    
    const {user} = useAuth()
    const auth = useAuth()
    const navigate = useNavigate()
    
    const [inputValue, setInputValue] = useState({
        email : "",
        password : ""
    })
    const [invalidEmail, setInvalidEmail] = useState("")
    const [invalidPassword, setInvalidPassword] = useState("")
    const [togglePWD, setTogglePWD] = useState(false)
    
    
    useEffect(() => {
        
        scrollTo(0,0)
        
    }, [])
    
    
    /* Fonction qui change la valeur des states en fonction de la valeur des champs */
    const handleChange = (e) => {
        
        setInvalidEmail("")
        setInvalidPassword("")
        const {name, value} = e.target
        setInputValue({...inputValue, [name] : value})
        
    }
    
    
    /* Fonction qui cache ou affiche la valeur du champs mot de passe */
    const togglePasswordVisibility = () => {
        setTogglePWD(!togglePWD)
    }
    
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            
            const {email, password} = inputValue
            
            if (email.trim() === ""
            || password.trim() === ""
            ) {
                setInvalidEmail("invalid-value")
                setInvalidPassword("invalid-value")
                return toast.error("Veuillez remplir tout les champs")
            }
        
            const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
            const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            
            if (!checkEmail.test(email)) {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez saisir une adresse email valide")
            } else if (email.length > 35) {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez saisir une adresse email plus petite")
            } else if (!checkPassword.test(password)) {
                setInvalidPassword("invalid-value")
                return toast.error("Mot de passe incorrect")
            }
            
            const serverRes = await axios.post("/api/users/login", inputValue)
            
            
            toast.success("Vous vous êtes connecté avec succès", {toastId : "id"})
            
            await auth.login(serverRes.data)
            
            
        } catch (e) {
            toast.error(e.response.data.message)
            setInvalidPassword("invalid-value")
            setInvalidEmail("invalid-value")
        }
    }
    
    
    return (
       <main className="loginpage-main">
            
            {user && user.userToken ? (
            
                <h1>Vous êtes déjà connecté</h1>
                
            )
                :
            (
            
                <article className="loginpage-article">
                
                      <h1>Connectez-vous à votre compte</h1>
                      <p>Veuillez entrer votre nom d'utilisateur et votre mot de passe</p>
                      
                      {/*** Formulaire ***/}
                      <form onSubmit={handleSubmit}>
                      
                          <fieldset className={`loginpage-input-label ${invalidEmail}`}>
                            <User className="input-icon" color="#ffffff" />
                            <input onChange={handleChange} value={inputValue.email} name="email" type="text" className="loginpage-input " required />
                            <label htmlFor="email" >Adresse email</label>
                          </fieldset>
                          
                          <fieldset className={`loginpage-input-label ${invalidPassword}`}>
                            <Lock className="input-icon" color="#ffffff" />
                            {!togglePWD ? (
                                <Eye onClick={togglePasswordVisibility} className="password-visibility"/>
                            ) : (
                                <EyeOff onClick={togglePasswordVisibility} className="password-visibility" />
                            )}
                            <input  onChange={handleChange} value={inputValue.password} name="password" type={togglePWD ? "text" : "password"} className="loginpage-input" required />
                            <label htmlFor="password" >Mot de passe</label>
                          </fieldset>
                          
                          <button type="submit" className="loginpage-button"> Se connecter </button>
                          <p> Vous n'avez pas de compte ? <NavLink className="loginpage-navlink-register" to="/inscription"> inscrivez-vous ici </NavLink></p>
                      
                      </form>
                      
                </article>
            
            )}
            
       </main>
       
    )
}

export default LogInPage