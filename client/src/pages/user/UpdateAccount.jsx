import { useAuth } from '../../context/AuthContext'
import { useState , useEffect } from 'react'
import { toast } from 'react-toastify'
import { token } from "../../context/token"
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom'
import { ChevronsRight } from 'lucide-react';

const UpdateAccount = () => {
    
    const navigate = useNavigate()
    const {user, update} = useAuth()
 
    const [inputValue, setInputValue] = useState({
            name : "",
            username : "",
            email : "",
            profilPicture : ""
        })
    const [previousValue, setPreviousValue] = useState({
            prevName : "",
            prevUsername : "",
            prevEmail : ""
        })
    const [invalidName, setInvalidName] = useState("")
    const [invalidUsername, setInvalidUsername] = useState("")
    const [invalidEmail, setInvalidEmail] = useState("")
    const [invalidFile, setInvalidFile] = useState("")
    const [toggle, setToggle] = useState(false)
    
    
    useEffect(() => {
        
        scrollTo(0,0)
        
        setInputValue({
            name : user.name,
            username : user.username,
            email : user.email
        })
        
        setPreviousValue({
            prevName : user.name,
            prevUsername : user.username,
            prevEmail : user.email
        })
        
    }, [user])
    
    
    /* Fonction qui change la valeur des states en fonction de la valeur des champs */
    const handleChange = (e) => {
        setInvalidName("")
        setInvalidUsername("")
        setInvalidEmail("")
        setInvalidFile("")
        
        const {name, value} = e.target
        
        
        if (name === "profilPicture") {
            setInputValue({...inputValue, profilPicture: e.target.files[0]})
            setToggle(true)
        } else {
            setInputValue({...inputValue, [name] : value})
        }
    }
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        try {
            
            const formData = new FormData();
            
            const {name, username, email, profilPicture} = inputValue
            const {prevName, prevUsername, prevEmail} = previousValue
            
            const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        
        
            const updateProfil = {};
            
            if (name.trim() === "") {
                setInvalidName("invalid-value")
                return toast.error("Veuillez renseigner votre prénom")
            } else if (username.trim() === "") {
                setInvalidUsername("invalid-value")
                return toast.error("Veuillez renseigner un nom d'utilisateur")
            } else if (email.trim() === "") {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez renseigner une adresse email")
            } else if (name.length < 2) {
                setInvalidName("invalid-value")
                return toast.error("Veuillez saisir un prénom plus grand")
            } else if (name.length > 25) {
                setInvalidName("invalid-value")
                return toast.error("Veuillez saisir un prénom plus petit")
            } else if (username.length < 4) {
                setInvalidUsername("invalid-value")
                return toast.error("Veuillez choisir un nom d'utilisateur plus long")
            } else if (username.length > 25) {
                setInvalidUsername("invalid-value")
                return toast.error("Veuillez choisir un nom d'utilisateur plus petit")
            } else if (!checkEmail.test(email)) {
                setInvalidEmail("invalid-value")
                return toast.error("Veuillez saisir une adresse email valide")
            }
            
            
            if (prevName === name
            && prevUsername === username
            && prevEmail === email
            && !toggle
            ) {
                setInvalidName("invalid-value")
                setInvalidUsername("invalid-value")
                setInvalidEmail("invalid-value")
                setInvalidFile("invalid-value")
                return toast.error("Aucun changement opéré")
            }
            
            
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("profilPicture", profilPicture);
            
            
            const serverRes = await axios.put("/api/users/updateprofil", formData, {headers : token()} )
            
            setPreviousValue({
                prevName : name,
                prevUsername : username,
                prevEmail : email
            })
            
            setToggle(false)
            
            setInvalidName("validated-form")
            setInvalidUsername("validated-form")
            setInvalidEmail("validated-form")
            setInvalidFile("validated-form")
            
            toast.success(serverRes.data.message)
            
            
            setTimeout(() => {
                navigate("/user/moncompte")
            }, 100)
            
            update()
            
        } catch (e) {
            
            toast.error(e.response.data.message)
            
        }
        
    }
    
    
    return (
        <main className="updateaccountpage-main container">
            
            {/***** Fil d'ariane ********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/user/moncompte" >Mon compte</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Modifier mes informations</NavLink>
            </nav>
            
            {/**** Contenu principal ****/}
            <section className="updateaccountpage-section">
            
                <h1>Modifier mes informations</h1>
                
                {/**** Formulaire *****/}
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                
                    <fieldset className={`updateaccountpage-input-label ${invalidName}`}>
                        <input onChange={handleChange} value={inputValue.name} name="name" type="text" className="updateaccountpage-input" required />
                        <label htmlFor="name" >Votre nom</label>
                   </fieldset>
                  
                   <fieldset className={`updateaccountpage-input-label ${invalidUsername}`}>
                        <input onChange={handleChange} value={inputValue.username} name="username" type="text" className="updateaccountpage-input" required />
                        <label htmlFor="username" >Votre nom d'utilisateur</label>
                   </fieldset>
                   
                   <fieldset className={`updateaccountpage-input-label ${invalidEmail}`}>
                        <input onChange={handleChange} value={inputValue.email} name="email" type="text" className="updateaccountpage-input" required />
                        <label htmlFor="email" >Votre email</label>
                   </fieldset>
                   
                   <fieldset className={`updateaccountpage-input-label ${invalidFile}`}>
                        <input onChange={handleChange} name="profilPicture" id="profilPicture" type="file" className="updateaccountpage- updateaccountpage-input" />
                        <label htmlFor="profilPicture" >Photo de profil</label>
                   </fieldset>
                    
                    <button type="submit" className="updateaccountpage-form-button"> Valider </button>
                    
                </form>
                
            </section>
            
        </main>
    )
}

export default UpdateAccount