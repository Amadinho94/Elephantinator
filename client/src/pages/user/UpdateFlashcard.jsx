import {useState, useEffect} from 'react'
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate, useParams, NavLink} from 'react-router-dom'
import { ChevronsRight } from 'lucide-react';

const UpdateFlashcard = () => {
    
    const {flashcardId} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [inputValue, setInputValue] = useState({
         title : "",
         rectoContent : "",
         versoContent : ""
    })
    const [previousFlashcard, setPreviousFlashcard] = useState([])
    const [invalidTitle, setInvalidTitle] = useState("")
    const [invalidRecto, setInvalidRecto] = useState("")
    const [invalidVerso, setInvalidVerso] = useState("")
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchParentFolder = async () => {
            try {
                
                const flashcard = await axios.get(`/api/flashcards/getone/${flashcardId}`, {headers : token()})
                setPreviousFlashcard(flashcard.data)
                
                setInputValue({
                     title : previousFlashcard.title,
                     rectoContent : previousFlashcard.rectoContent,
                     versoContent : previousFlashcard.versoContent
                })
                
                
            } catch (e) {}
        }
        
        fetchParentFolder()
        
    }, [toggle])
    
    
    /* S'execute après 0,5 seconde pour réexecuter le use Effect et remplir les champs avec les anciennes valeurs */
    setTimeout(() => {
            setToggle(true)
    }, 500)
    
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
        
        const confirmModal = window.confirm("Voulez-vous vraiment effectuer ces changements ?")
        
        if (confirmModal) {
            
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
                } else if (rectoContent.trim() === previousFlashcard.rectoContent
                    && versoContent.trim() === previousFlashcard.versoContent
                    && title.trim() === previousFlashcard.title
                    ) {
                    setInvalidTitle("invalid-value")
                     setInvalidVerso("invalid-value")
                     setInvalidRecto("invalid-value")
                    return toast.error("Vous n'avez fait aucune modification")
                }
                
                const serverRes = await axios.put(`/api/flashcards/update/${flashcardId}`, inputValue, {headers : token()})
                
                setInputValue({
                     title : "",
                     rectoContent : "",
                     versoContent : ""
                })
                
                
                setTimeout(() => {
                    navigate(`/user/monespacedetravail/flashcard/${previousFlashcard.folderId}`)
                }, 500)
                
                toast.success(serverRes.data.message)
                
            } catch (e) {
                 toast.error(e.response.data.message)
                 setInvalidTitle("invalid-value")
                 setInvalidVerso("invalid-value")
                 setInvalidRecto("invalid-value")
            }
            
        }
        
    }
    
    
    
    return (
        <main className="updateflashcardpage-main">
            
            {/**** Fil d'ariane *****/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/dossier/${user.id}`} >Workspace</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/flashcard/${previousFlashcard.folderId}`}> Dossier </NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#"> Modifier une flashcard </NavLink>
            </nav>
            
            {/**** Contenu principal ***/}
            <section className="updateflashcardpage-section">
            
                <h1>Modifier la flashcard</h1>
                
                {/****** Formulaire *****/}
                <form onSubmit={handleSubmit}>
                
                    <fieldset className={`updateflashcardpage-input-label ${invalidRecto}`}>
                        <textarea onChange={handleChange} value={inputValue.rectoContent} name="rectoContent" type="text" className="updateflashcardpage-input" required />
                        <label htmlFor="rectoContent" > Recto </label>
                   </fieldset>
                  
                   <fieldset className={`updateflashcardpage-input-label ${invalidVerso}`}>
                        <textarea onChange={handleChange} value={inputValue.versoContent} name="versoContent" type="text" className="updateflashcardpage-input" required />
                        <label htmlFor="versoContent" > Verso </label>
                   </fieldset>
                   
                   <fieldset className={`updateflashcardpage-input-label ${invalidTitle}`}>
                        <input onChange={handleChange} value={inputValue.title} name="title" type="text" className="updateflashcardpage-input" />
                        <label htmlFor="title" >Titre (facultatif)</label>
                   </fieldset>
                    
                   <button type="submit" className="updateflashcardpage-form-button"> Confirmer les modifications </button>    
                
                </form>
                
            </section>
            
        </main>
    )
    
}

export default UpdateFlashcard


    
    

