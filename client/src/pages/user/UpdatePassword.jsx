import {useState, useEffect} from "react"
import {toast} from 'react-toastify'
import axios from 'axios'
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import { X , Check , ChevronsRight , Eye , EyeOff  } from 'lucide-react';
import { useNavigate , NavLink } from 'react-router-dom'


const UpdatePassword = () => {
    
    const navigate = useNavigate()
    const {user, update} = useAuth()
    
    const [userPassword, setUserPassword] = useState({
        previousPWD : "",
        newPWD : "",
    })
    
    const {previousPWD, newPWD} = userPassword
    
    const [confirmedPWD, setConfirmedPWD] = useState("")
    const [invalidPreviousPassword, setInvalidPreviousPassword] = useState("")
    const [invalidNewPassword, setInvalidNewPassword] = useState("")
    const [invalidConfirmedPassword, setInvalidConfirmedPassword] = useState("")
    const [togglePWD, setTogglePWD] = useState(false)
    const [toggleConfirmedPWD, setToggleConfirmedPWD] = useState(false)
    const [togglePreviousPWD, setTogglePreviousPWD] = useState(false)
    
    /* State qui va servir à afficher une croix ou un check selon validiter du mot de passe saisit */
    const [passwordValidator, setPasswordValidator] = useState({
        minLength: false,
        uppercase : false,
        lowercase : false,
        specialCharacter : false
    })
    
    
    useEffect(() => {
        scrollTo(0,0)
    }, [])
    
    
    /* Fonction qui mets à jour la valeur des states en fonction de la valeur des champs du formulaire */
    const handleChange = (e) => {
        
        setInvalidConfirmedPassword("")
        setInvalidNewPassword("")
        setInvalidPreviousPassword("")
        
        const {name, value} = e.target
        
        setUserPassword({...userPassword, [name] : value})
        
        if (name === "newPWD") {
            
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
        
        if (name === "confirmedPWD") {
            setConfirmedPWD(value)
        }
    }
    
    
    /* Fonctions qui cache ou affiche la saisit dans les champs */
    const togglePasswordVisibility = () => {
        setTogglePWD(!togglePWD)
    }
    const toggleConfirmedPasswordVisibility = () => {
        setToggleConfirmedPWD(!toggleConfirmedPWD)
    }
    const togglePreviousPasswordVisibility = () => {
        setTogglePreviousPWD(!togglePreviousPWD)
    }
    
    
    /* Fonction qui soumet le formulaire */ 
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const confirmModal = window.confirm("Voulez-vous vraiment effectuer ce changement de mot de passe ?")
        
        if (confirmModal) {
            
            try {
                
                const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,300}$/
                
                if (previousPWD.trim() === ""
                || newPWD.trim() === ""
                || confirmedPWD.trim() === ""
                ) {
                    return toast.error("Veuillez remplir tout les champs")
                    
                } else if (!checkPassword.test(previousPWD)) {
                    setInvalidPreviousPassword("invalid-value")
                    return toast.error("Mot de passe invalide")
                
                } else if (!checkPassword.test(newPWD)) {
                    setInvalidNewPassword("invalid-value")
                    return toast.error("Mot de passe pas assez sécurisé")
                
                    
                } else if (!checkPassword.test(newPWD)) {
                    setInvalidNewPassword("invalid-value")
                    return toast.error("Mot de passe pas assez sécurisé")
                    
                } else if (newPWD !== confirmedPWD) {
                    setInvalidNewPassword("invalid-value")
                    setInvalidConfirmedPassword("invalid-value")
                    return toast.warning("Les mots de passe doivent être identique")
                
                    
                } else if (newPWD === previousPWD) {
                    setInvalidPreviousPassword("invalid-value")
                    setInvalidNewPassword("invalid-value")
                    setInvalidConfirmedPassword("invalid-value")
                    return toast.warning("Veuillez choisir un nouveau mot de passe différent")
                }
                
                const serverRes = await axios.put(`/api/users/resetpassword/${user.id}`, userPassword, {headers : token()})
                
                toast.success(serverRes.data.message)
                
                setUserPassword({
                    previousPWD : "",
                    newPWD : "",
                })
                
                setConfirmedPWD("")
                
                setTimeout(() => {
                    navigate("/user/moncompte")
                }, 100)
                
                update()
            } catch (e) {
                setInvalidPreviousPassword("invalid-value")
                setInvalidNewPassword("invalid-value")
                setInvalidConfirmedPassword("invalid-value")
                toast.error(e.response.data.message)
            }
            
        }
        
    }
    
    
    /* Fonction qui retourne une croix ou un check en fonction de la valeur de l'argument */
    const iconValidator = (isValid) => {
        return isValid ? <Check color="#14db22" /> : <X color="#db1414" />
    }
    
    
    
    return (
        <main className="updatepasswordpage-main">
            
            {/******* Fil d'ariane ********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/user/moncompte" >Mon compte</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Modifier mon mot de passe</NavLink>
            </nav>
            
            {/****** Contenu principal *****/}
            <section className="updatepasswordpage-section">
            
                <h1>Modifier mon mot de passe</h1>
                
                {/**** Formulaire *******/}
                <form onSubmit={handleSubmit}>
                    
                    <fieldset className={`updatepasswordpage-input-label ${invalidPreviousPassword}`}>
                    
                        {!togglePreviousPWD ? (
                            <Eye onClick={togglePreviousPasswordVisibility} className="update-password-visibility"/>
                        ) : (
                            <EyeOff onClick={togglePreviousPasswordVisibility} className="update-password-visibility" />
                        )}
                        
                        <input onChange={handleChange} value={previousPWD} name="previousPWD" type={togglePreviousPWD ? "text" : "password"} className="updatepasswordpage-input" required />
                        <label htmlFor="previousPWD" >Mot de passe actuel</label>
                   
                   </fieldset>
                  
                   <fieldset className={`updatepasswordpage-input-label ${invalidNewPassword}`}>
                        
                        {!togglePWD ? (
                            <Eye onClick={togglePasswordVisibility} className="update-password-visibility"/>
                        ) : (
                            <EyeOff onClick={togglePasswordVisibility} className="update-password-visibility" />
                        )}
                        <input onChange={handleChange} value={newPWD} name="newPWD" type={togglePWD ? "text" : "password"} className="updatepasswordpage-input" required />
                        <label htmlFor="newPWD" >Nouveau mot de passe</label>
                   
                   </fieldset>
                   
                   <fieldset className={`updatepasswordpage-input-label ${invalidConfirmedPassword}`}>
                        
                        {!toggleConfirmedPWD ? (
                            <Eye onClick={toggleConfirmedPasswordVisibility} className="update-password-visibility"/>
                        ) : (
                            <EyeOff onClick={toggleConfirmedPasswordVisibility} className="update-password-visibility" />
                        )}
                        <input onChange={handleChange} value={confirmedPWD} name="confirmedPWD" type={toggleConfirmedPWD ? "text" : "password"} className="updatepasswordpage-input" required />
                        <label htmlFor="confirmedPWD" >Confirmez mot de passe </label>
                   
                   </fieldset>
                   
                   {/**** Section qui affiche si le mot de passe est valide ***/}
                   {passwordValidator.isFocus &&
                        <section className="registerpage-section-password-validator">
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.lowercase)} 1 lettre minuscule minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.uppercase)} 1 lettre majuscule minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.specialChar)} 1 caractère spécial minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(passwordValidator.minLength)} 8 caractères minimum</p>
                            <p className="registerpage-password-validator">{iconValidator(newPWD && confirmedPWD === newPWD)} Mot de passe de confirmation identique</p>
                        </section>
                    }
                    
                   <button type="submit" className="updatepasswordpage-form-button"> Valider </button>
                   
                </form>
                
            </section>
            
        </main>
    )
}


export default UpdatePassword