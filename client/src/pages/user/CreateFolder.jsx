import {useState, useEffect} from 'react'
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate, NavLink} from 'react-router-dom'
import { ChevronsRight } from 'lucide-react';

const CreateFolder = () => {
    
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [inputValue, setInputValue] = useState({
         title : "",
         description : "",
    })
    
    const [invalidTitle, setInvalidTitle] = useState("")
    const [invalidDescription, setInvalidDescription] = useState("")
    
    useEffect(() => {
        scrollTo(0,0)
     }, [])
    
    const handleChange = (e) => {
        setInvalidTitle("")
        setInvalidDescription("")
        
        const {name, value} = e.target

        setInputValue({...inputValue, [name] : value})
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            
            const {title, description} = inputValue
            
            if (title.trim() === "") {
                setInvalidTitle("invalid-value")
                return toast.error("Veuillez remplir tout les champs")
            } else if (title.length > 20) {
                setInvalidTitle("invalid-value")
                return toast.error("Veuillez saisir un titre plus court")
            } else if (description && description.length > 3000) {
                setInvalidDescription("invalid-value")
                return toast.error("Veuillez saisir une description plus courte")
            }
            
            const serverRes = await axios.post(`/api/folders/create/${user.id}`, inputValue, {headers : token()})
            
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
    
    
    
    return (
        <main className="createfolderpage-main">
            
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/dossier/${user.id}`} >Workspace</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#"> Créer un dossier </NavLink>
            </nav>
            
            <section className="createfolderpage-section">
                <h1>Créer un dossier</h1>
                
                <form onSubmit={handleSubmit}>
                    <fieldset className={`createfolderpage-input-label ${invalidTitle}`}>
                        <input onChange={handleChange} value={inputValue.title} name="title" type="text" className="createfolderpage-input" required />
                        <label htmlFor="title" >Titre du dossier</label>
                   </fieldset>
                  
                   <fieldset className={`createfolderpage-input-label ${invalidDescription}`}>
                        <input onChange={handleChange} value={inputValue.description} name="description" type="text" className="createfolderpage-input" required />
                        <label htmlFor="description" >Description</label>
                   </fieldset>
                    
                    
                    <button type="submit" className="updatefolderpage-form-button"> Valider </button>    
                </form>
                
            </section>
        </main>
    )
}

export default CreateFolder