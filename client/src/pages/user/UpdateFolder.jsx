import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate, NavLink} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import { ChevronsRight } from 'lucide-react';


const UpdateFolder = () => {
    
    const {folderId} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [inputValue, setInputValue] = useState({
         title : "",
         description : "",
    })
    const [previousData, setPreviousData] = useState([])
    const [toggle, setToggle] = useState(false)
    const [invalidTitle, setInvalidTitle] = useState("")
    const [invalidDescription, setInvalidDescription] = useState("")
    
    useEffect(() => {
            scrollTo(0,0)
            document.body.style.overflow = ""
            
            const fetchParentFolder = async () => {
                try {
                    
                    const folder = await axios.get(`/api/folders/getone/${folderId}`, {headers : token()})
                    setPreviousData(folder.data)
                    
                    setInputValue({
                         title : previousData.title,
                         description : previousData.description
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
        setInvalidDescription("")
        
        const {name, value} = e.target

        setInputValue({...inputValue, [name] : value})
    }
    
    /* Fonction qui soumet le formulaire */
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        
        const confirmModal = window.confirm("Voulez-vous vraiment effectuer ces changements ?")
        
        if (confirmModal) {
            
            try {
                
                const {title, description} = inputValue
                
                if (title.trim() === "") {
                    setInvalidTitle("invalid-value")
                    setInvalidDescription("invalid-value")
                    return toast.error("Veuillez donner un titre à ce dossier")
                } else if (title.length > 20) {
                    setInvalidTitle("invalid-value")
                    return toast.error("Veuillez saisir un titre plus court")
                } else if (description.length > 3000) {
                    setInvalidDescription("invalid-value")
                    return toast.error("Veuillez saisir une description plus courte")
                } else if (title.trim() === previousData.title
                && description.trim() === previousData.description
                ) {
                    setInvalidTitle("invalid-value")
                    setInvalidDescription("invalid-value")
                    return toast.error("Vous n'avez fait aucune modification")
                }
                
                const serverRes = await axios.put(`/api/folders/update/${folderId}`, inputValue, {headers: token()})
                
                setInputValue({
                     title : "",
                     description : "",
                })
                
                setTimeout(() => {
                    navigate(`/user/monespacedetravail/dossier/${user.id}`)
                }, 500)
                
                toast.success(serverRes.data.message)
                
            } catch (e) {
                 toast.error(e.response.data.message)
                 setInvalidTitle("invalid-value")
                setInvalidDescription("invalid-value")
            }
        }
        
    }
    
    
    return (
        <main className="updatefolderpage-main">
             
             {/***** Fil d'ariane *****/}
             <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/dossier/${user.id}`} >Workspace</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#"> Modifier le dossier {previousData.title} </NavLink>
            </nav>
            
            {/****** Contenu principal *****/}
            <section className="updatefolderpage-section">
            
                <h1>Modifier le dossier</h1>
                
                {/**** Formulaire *****/}
                <form onSubmit={handleSubmit}>
                
                    <fieldset className={`updatefolderpage-input-label ${invalidTitle}`}>
                        <input onChange={handleChange} value={inputValue.title} name="title" type="text" className="updatefolderpage-input" required />
                        <label htmlFor="title" >Titre du dossier</label>
                   </fieldset>
                  
                   <fieldset className={`updatefolderpage-input-label ${invalidDescription}`}>
                        <input onChange={handleChange} value={inputValue.description} name="description" type="text" className="updatefolderpage-input" required />
                        <label htmlFor="description" >Description</label>
                   </fieldset>
                    
                    <button type="submit" className="updatefolderpage-form-button"> Valider </button>   
                    
                </form>
                
            </section>
            
        </main>
    )
}

export default UpdateFolder