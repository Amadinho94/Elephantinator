import {useState, useEffect} from 'react'
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate, useParams, NavLink} from 'react-router-dom'
import { ChevronsRight } from 'lucide-react';


const CreateFlashcard = () => {
    
    const {folderId} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [inputValue, setInputValue] = useState({
         title : "",
         rectoContent : "",
         versoContent : ""
    })
    const [invalidTitle, setInvalidTitle] = useState("")
    const [invalidRecto, setInvalidRecto] = useState("")
    const [invalidVerso, setInvalidVerso] = useState("")
    
    
    useEffect(() => {
        scrollTo(0,0)
     }, [])
    
    
    /* Fonction qui change la valeur des states en fonction de la valeur des champs */
    const handleChange = (e) => {
        setInvalidTitle("")
        setInvalidRecto("")
        setInvalidVerso("")
        
        const {name, value} = e.target

        setInputValue({...inputValue, [name] : value})
    }
    
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        try {
            
            const {title, rectoContent, versoContent} = inputValue
            
            if (rectoContent.trim() === "") {
                setInvalidRecto("invalid-value")
                return toast.error("Veuillez saisir le contenu du recto de la flashcard")
            } else if (versoContent.trim() === "") {
                setInvalidVerso("invalid-value")
                return toast.error("Veuillez saisir le contenu du verso de la flashcard")
            } else if (rectoContent.length > 150) {
                setInvalidRecto("invalid-value")
                return toast.error("Veuillez saisir un contenu plus court")
            } else if (versoContent.length > 400) {
                setInvalidVerso("invalid-value")
                return toast.error("Veuillez saisir un contenu plus court")
            } else if (title && title.length > 20) {
                setInvalidTitle("invalid-value")
                return toast.error("Veuillez saisir un titre plus courte")
            }
            
            const serverRes = await axios.post(`/api/flashcards/create/${folderId}`, inputValue, {headers : token()})
            
            setInputValue({
                 title : "",
                 rectoContent : "",
                 versoContent : ""
            })
            
            setTimeout(() => {
                navigate(`/user/monespacedetravail/flashcard/${folderId}`)
            }, 500)
            
            toast.success(serverRes.data.message)
            
        } catch (e) {
             toast.error(e.response.data.message)
             setInvalidTitle("invalid-value")
             setInvalidVerso("invalid-value")
             setInvalidRecto("invalid-value")
        }
    }
    
    
    return (
        <main className="createflashcardpage-main">
            
            {/*** Fil d'ariane ***/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/dossier/${user.id}`} >Workspace</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/flashcard/${folderId}`}> Dossier </NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#"> Créer une flashcard </NavLink>
            </nav>
            
            {/*** Contenu principal *****/}
            <section className="createflashcardpage-section">
            
                <h1>Créer une flashcard</h1>
                
                {/***** Formulaire ******/}
                <form onSubmit={handleSubmit}>
                
                    <fieldset className={`createflashcardpage-input-label ${invalidRecto}`}>
                        <textarea onChange={handleChange} value={inputValue.rectoContent} name="rectoContent" type="text" className="createflashcardpage-input" required />
                        <label htmlFor="rectoContent" > Recto </label>
                   </fieldset>
                  
                   <fieldset className={`createflashcardpage-input-label ${invalidVerso}`}>
                        <textarea onChange={handleChange} value={inputValue.versoContent} name="versoContent" type="text" className="createflashcardpage-input" required />
                        <label htmlFor="versoContent" > Verso </label>
                   </fieldset>
                   
                   <fieldset className={`createflashcardpage-input-label ${invalidTitle}`}>
                        <input onChange={handleChange} value={inputValue.title} name="title" type="text" className="createflashcardpage-input" />
                        <label htmlFor="title" >Titre (facultatif)</label>
                   </fieldset>
                    
                    <button type="submit" className="createflashcardpage-form-button"> Confirmer la création </button>    
                
                </form>
                
            </section>
            
        </main>
    )
}

export default CreateFlashcard