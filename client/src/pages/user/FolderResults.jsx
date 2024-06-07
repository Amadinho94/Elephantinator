import { useEffect , useState } from 'react'
import { NavLink , useParams } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { ChevronsRight } from 'lucide-react';


const FolderResults = () => {
    
    const {user} = useAuth()
    const {folderId} = useParams()
    
    const [allResults, setAllResults] = useState([])
    const [thisFolder, setThisFolder] = useState({})
    const [toggle, setToggle] = useState(false)
    
    
    useEffect(() => {

        scrollTo(0,0)
        
        const fetchData = async () => {
            try {
                
                const fetchResults = await axios.get(`/api/results/getallfolderresults/${folderId}`, {headers : token()})
                setAllResults(fetchResults.data)
                
                const fetchFolder = await axios.get(`/api/folders/getone/${folderId}`, {headers : token()})
                setThisFolder(fetchFolder.data)
                
                
            } catch(e) {
                
            }
        }
        
        fetchData()
        
    }, [toggle])
    
    
    /* Fonction pour supprimer un seul résultat de révision */
    const handleDeleteOne = async (resultIndex) => {
        
        const confirmModal = window.confirm("Voulez-vous vraiment supprimer ce résultat de révision ?")
        
        if (confirmModal) {
        
            setToggle(!toggle)
            
            try {
                
                const serverRes = await axios.delete(`/api/results/deleteoneresult/${resultIndex}`, {headers : token()})
                
                return toast.success(serverRes.data.message)
                
            } catch (e) {
                return toast.error(e.response.data.message)
            }
        }
            
    }
    
    
    /* Fonction pour supprimer tout les résultats de révision */
    const handleDeleteAll = async () => {
        
        const confirmModal = window.confirm("Voulez-vous vraiment supprimer tout l'historique des résultats de révision de ce dossier ?")
        
        if (confirmModal) {
        
            setToggle(!toggle)
            
            try {
                
                const serverRes = await axios.delete(`/api/results/deleteallfolderresults/${folderId}`, {headers : token()})
                
                return toast.success(serverRes.data.message)
                
            } catch (e) {
                return toast.error(e.response.data.message)
            }
            
        }
        
    }
    
    
    return (
        <main className="folderresult-main container">
            
            {/***** Fil d'ariane *****/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/user/tableaudebord" >Tableau de bord {user.role === "admin"&& "user"}</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Historique de révision du dossier {thisFolder.title}</NavLink>
            </nav>
            
            <h1>Tableau de bord {user.role === "admin" && `utilisateur`}</h1>
            
            {/*** Contenu principal ***/}
            <article className="folderresult-article">
            
                <h2>Historique de révision du dossier {thisFolder.title}</h2>
                
                {allResults.length < 1 ? (
                    <>
                        <h3>Historique vide : aucune révision pour ce dossier</h3>
                        
                        <NavLink to={`/user/monespacedetravail/flashcard/${folderId}`} className="folderresults-start-revision-button"> Démarrer une révision </NavLink>
                     </>
                )
                    :
                (   
                    <>
                        <button onClick={() => handleDeleteAll()} className="allresults-deleteall-button">Supprimer tout l'historique de ce dossier</button>
                        <ul className="folderresult-list">
                            {allResults.map((oneResult) => (
                               <li key={oneResult._id}><p>Note de {oneResult.numbersGoodAnswers} sur {oneResult.numbersQuestions} obtenue {new Date().toLocaleDateString() === new Date(oneResult.createdAt).toLocaleDateString() ? `aujourd'hui` : `le ${new Date(oneResult.createdAt).toLocaleDateString()}`} à {new Date(oneResult.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneResult.createdAt).getMinutes().toString().padStart(2, '0')}</p> <Trash2 onClick={() => handleDeleteOne(oneResult._id)} className="allresults-deleteone-button" /> </li>
        
                            ))}
                        </ul>
                    </>
                )}
                
            </article>
            
        </main>
    )
}

export default FolderResults