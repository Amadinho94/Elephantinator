import {NavLink, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { X , Check , ChevronsRight} from 'lucide-react';


const AdminCreateUser = () => {
   
   const [inputValue, setInputValue] = useState({
        name : "",
        username : "",
        email : "",
        password : "",
    })
    
    const [passwordValidator, setPasswordValidator] = useState({
        minLength: false,
        uppercase : false,
        lowercase : false,
        specialCharacter : false
    })
    
    const [invalidName, setInvalidName] = useState("")
    const [invalidEmail, setInvalidEmail] = useState("")
    const [invalidUsername, setInvalidUsername] = useState("")
    const [invalidPassword, setInvalidPassword] = useState("")
    const [invalidConfirmedPassword, setInvalidConfirmedPassword] = useState("")
    
    const [confirmedPassword, setConfirmedPassword] = useState("")
    
    const navigate = useNavigate()
    
    
    useEffect(() => {
        scrollTo(0,0)
    }, [])
    
    
    /* Fonction qui change la valeur des state en fonction 
    des changements des champs du formulaire */
    const handleChange = (e) => {
        setInvalidName("")
        setInvalidUsername("")
        setInvalidEmail("")
        setInvalidPassword("")
        setInvalidConfirmedPassword("")
        
        const {name, value} = e.target
        setInputValue({...inputValue, [name] : value})
        
        if (name === "password") {
            const minLength = value.length >= 8;
            const uppercase = /[A-Z]/.test(value);
            const lowercase = /[a-z]/.test(value);
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
            
            if (value === "") {
                return setPasswordValidator({
                minLength,
                uppercase,
                lowercase,
                specialChar,
                isFocus : false
            })
            
            }
            return setPasswordValidator({
                minLength,
                uppercase,
                lowercase,
                specialChar,
                isFocus : true
            })
        }
        
        if (name === "confirmedPassword") {
           setConfirmedPassword(value) 
        }
    }
    
    
    // Fonction qui créer un nouvel utilisateur
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            
            const {name, username, email, password} = inputValue
            
    
            if (name.trim() === ""
            || username.trim() === ""
            || email.trim() === ""
            || password.trim() === ""
            || confirmedPassword.trim() === ""
            ) {
                setInvalidName("invalid-value")
                setInvalidUsername("invalid-value")
                setInvalidEmail("invalid-value")
                setInvalidPassword("invalid-value")
                setInvalidConfirmedPassword("invalid-value")
                return toast.error("Veuillez remplir tout les champs")
            }
            
            const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
            
            if (name.length < 2) {
                setInvalidName("invalid-value")
                return toast.error("Veuillez saisir un prénom plus grand")
            } else if (name.length > 25) {
                setInvalidName("invalid-value")
                return toast.error("Veuillez saisir un prénom plus petit")
            
            } else if (!checkEmail.test(email)) {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez saisir une adresse email valide")
            } else if (email.length > 35) {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez saisir une adresse email plus petite")
           
            } else if (username.length < 4) {
                setInvalidUsername("invalid-value")
                return toast.error("Veuillez choisir un nom d'utilisateur plus grand")
            } else if (username.length > 25) {
                setInvalidUsername("invalid-value")
                return toast.error("Veuillez choisir un nom d'utilisateur plus petit")
            
                
            } else if (!checkPassword.test(password)) {
                setInvalidPassword("invalid-value")
                return toast.error("Mot de passe n'est pas assez sécurisé")
            } else if (password !== confirmedPassword) {
                setInvalidPassword("invalid-value")
                setInvalidConfirmedPassword("invalid-value")
                return toast.warning("Les mots de passe doivent être identique")
            }
        
        
            const serverRes = await axios.post("/api/users/register", inputValue)
            
            toast.success(serverRes.data.message)
            
            setInputValue({
                name : "",
                username : "",
                email : "",
                password : ""
            })
            
            setConfirmedPassword("")
            
            setTimeout(() => {
                navigate("/admin/tableaudebord/gestionnaireutilisateurs")
            }, 100)
            
        } catch (e) {
            toast.error(e.response.data.message)
        }
        
    }
    
    
    /* Fonction qui fait renvoie un check vert 
    si l'argument est === true et renvoie une croix rouge si l'argument
    est === false */
    const iconValidator = (isValid) => {
        return isValid ? <Check color="#14db22" /> : <X color="#db1414" />
    }
    
    
    
    return (
       <main className="container registerpage-main">
            
            
            {/******** Fil d'ariane **********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord/gestionnaireutilisateurs">Gestionnaire d'utilisateurs</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Créer un utilisateur</NavLink>
            </nav>
            
            {/******* Section du formulaire ********/}
            <section className="registerpage-article">
            
                  <h1>Créez un utilisateur</h1>
                  <p>Veuillez saisir les informations demandées</p>
                  
                  {/****** Formulaire **********/}
                  <form onSubmit={handleSubmit} >
                      
                      <fieldset className={`registerpage-input-label ${invalidName}`}>
                        <input onChange={handleChange} value={inputValue.name} name="name" type="text" className="registerpage-input" required />
                        <label htmlFor="name" >Prénom</label>
                      </fieldset>
                      
                      <fieldset className={`registerpage-input-label ${invalidEmail}`}>
                        <input onChange={handleChange} value={inputValue.email} name="email" type="text" className="registerpage-input" required />
                        <label htmlFor="email" >Adresse email</label>
                      </fieldset>
                      
                      <fieldset className={`registerpage-input-label ${invalidUsername}`}>
                        <input onChange={handleChange} value={inputValue.username} name="username" type="text" className="registerpage-input" required />
                        <label htmlFor="username" >Nom d'utilisateur</label>
                      </fieldset>
                      
                      <fieldset className={`registerpage-input-label ${invalidPassword}`}>
                        <input onChange={handleChange} value={inputValue.password} name="password" type="password" className="registerpage-input" required />
                        <label htmlFor="password" >Mot de passe</label>
                      </fieldset>
                      
                      <fieldset className={`registerpage-input-label ${invalidConfirmedPassword}`}>
                        <input onChange={handleChange} value={confirmedPassword} name="confirmedPassword" type="password" className="registerpage-input" required />
                        <label htmlFor="confirmedPassword" >Confirmer mot de passe</label>
                      </fieldset>
                      
                      
                      {/******* Section du validateur de mot de passe ********/}
                      {passwordValidator.isFocus &&
                        <section className="registerpage-section-password-validator">
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.lowercase)} 1 lettre minuscule minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.uppercase)} 1 lettre majuscule minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.specialChar)} 1 caractère spécial minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.minLength)} 8 caractères minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(inputValue.password && confirmedPassword === inputValue.password)} Mot de passe de confirmation identique</p>
                        </section>
                      }
                      
                      <button type="submit" className="registerpage-button"> S'inscrire </button>
                    
                  </form>
            </section>
            
       </main>
    )
    
}

export default AdminCreateUser