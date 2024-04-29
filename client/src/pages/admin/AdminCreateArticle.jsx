import {useAuth} from '../../context/AuthContext'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {token} from "../../context/token"
import axios from 'axios'
import { useNavigate , NavLink } from 'react-router-dom'
import { ChevronsRight } from 'lucide-react';


const AdminCreateArticle = () => {
    
    const navigate = useNavigate()
    const {user} = useAuth()
    
    const [articleToUpdate, setArticleToUpdate] = useState({})
    
    const [inputValue, setInputValue] = useState({
        title : "",
        authorName : "",
        summary : "",
        paragraphs : "",
        articleImage : ""
    })
    
    
    // State qui stocke la classe appliqué au bordure des inputs
    const [invalidTitle, setInvalidTitle] = useState("")
    const [invalidAuthorName, setInvalidAuthorName] = useState("")
    const [invalidSummary, setInvalidSummary] = useState("")
    const [invalidParagraphs, setInvalidParagraphs] = useState("")
    
    
    useEffect(() => {
        scrollTo(0,0)
    }, [])


    /* Fonction qui change la valeur des state en fonction 
    des changements des champs du formulaire */
    const handleChange = (e) => {
        setInvalidTitle("")
        setInvalidAuthorName("")
        setInvalidSummary("")
        setInvalidParagraphs("")
        
        const {name, value} = e.target
        
        if (name === "articleImage") {
            setInputValue({...inputValue, articleImage : e.target.files[0]})
        } else {
            setInputValue({...inputValue, [name] : value})
        }
        
    }


    // Fonction qui créer un nouvelle article
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        
        try {
            
            const formData = new FormData();
            
        
            const {title, authorName, summary, paragraphs, articleImage} = inputValue
        
        
        
            if (title.trim() === "") {
                setInvalidTitle("invalid-value")
                return  toast.error("Veuillez saisir un titre pour l'article")
            } else if (authorName.trim() === "") {
                setInvalidAuthorName("invalid-value")
                return  toast.error("Veuillez saisir le nom de l'auteur de l'article")
            } else if (summary.trim() === "") {
                setInvalidSummary("invalid-value")
                return  toast.error("Veuillez saisir le résumé de l'article")
            } else if (paragraphs.trim() === "") {
                setInvalidParagraphs("invalid-value")
                return  toast.error("Veuillez saisir le contenu de l'article")
            } else if (title.length < 2) {
                setInvalidTitle("invalid-value")
                return  toast.error("Veuillez saisir un titre plus long")
            } else if (title.length > 100) {
                setInvalidTitle("invalid-value")
                return toast.error("Veuillez saisir un titre plus court")
            } else if (authorName.length < 2) {
                setInvalidAuthorName("invalid-value")
                return toast.error("Veuillez saisir un nom d'auteur plus long")
            } else if (authorName.length > 25) {
                setInvalidAuthorName("invalid-value")
                return toast.error("Veuillez saisir un nom d'auteur plus court")
            } else if (summary.length < 150) {
                setInvalidSummary("invalid-textarea")
                return toast.error("Veuillez saisir un résumé plus long")
            } else if (summary.length > 1000) {
                setInvalidSummary("invalid-textarea")
                return toast.error("Veuillez saisir un résumé plus court")
            } else if (paragraphs.length < 150) {
                setInvalidParagraphs("invalid-textarea")
                return toast.error("Veuillez saisir un contenu plus long")
            } else if (paragraphs.length > 10000) {
                setInvalidParagraphs("invalid-textarea")
                return toast.error("Veuillez saisir un contenu plus court")
            }
            
            
            formData.append("title", title);
            formData.append("authorName", authorName);
            formData.append("summary", summary);
            formData.append("paragraphs", paragraphs);
            formData.append("articleImage", articleImage);
            
            
            
            
            const serverRes = await axios.post(`/api/articles/newarticle`, formData, {headers : token()} )
            
            toast.success(serverRes.data.message)
            
            
            
            setTimeout(() => {
                navigate("/admin/tableaudebord/gestionnairearticles")
            }, 100)
            
            
        } catch (e) {
            toast.error(e.response.data.message)
        }
        
    }
    
    
    return (
        <main className="container main-admin-create-form">
            
            
            {/****** Fil d'ariane ********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord/gestionnairearticles">Gestionnaire d'articles</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Créer un article</NavLink>
            </nav>
            
            
            {/******* Section du formulaire *******/}
            <section className="adminformpage-section">
                <h1>Créer un article</h1>
                
                
                {/****** Formulaire ***********/}
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                
                    <fieldset className={`adminformpage-input-label ${invalidTitle}`}>
                        <input onChange={handleChange} value={inputValue.title} name="title" type="text" className="adminformpage-input" required />
                        <label htmlFor="title" > Titre </label>
                   </fieldset>
                  
                   <fieldset className={`adminformpage-input-label ${invalidAuthorName}`}>
                        <input onChange={handleChange} value={inputValue.authorName} name="authorName" type="text" className="adminformpage-input" required />
                        <label htmlFor="authorName" > Auteur </label>
                   </fieldset>
                   
                   <fieldset className="adminformpage-input-label">
                        <input onChange={handleChange} name="articleImage" id="articleImage" type="file" className="adminformpage adminformpage-input" />
                        <label htmlFor="articleImage"> Image de l'article </label>
                   </fieldset>
                   
                   <fieldset className="adminformpage-input-label">
                        <textarea className={`adminformpage-textarea ${invalidSummary}`} onChange={handleChange} value={inputValue.summary} name="summary" type="text"  required />
                        <label htmlFor="summary" > Résumé </label>
                   </fieldset>
                   
                   <fieldset className="adminformpage-input-label">
                        <textarea className={`adminformpage-textarea ${invalidParagraphs}`} onChange={handleChange} value={inputValue.paragraphs} name="paragraphs" type="text" required />
                        <label htmlFor="paragraphs" > Contenu </label>
                   </fieldset>
                   
                    
                    
                    <button type="submit" className="adminformpage-form-button"> Valider </button>    
                </form>
                
            </section>
            
        </main>
    )
}

export default AdminCreateArticle