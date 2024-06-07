import {useState, useEffect} from "react"
import {useParams, NavLink, useNavigate} from "react-router-dom"
import axios from "axios"
import {token} from "../../context/token"
import {useAuth} from '../../context/AuthContext'
import { X, Folder, CircleEllipsis, FolderPlus, Trash2, Pen } from 'lucide-react';


const WorkSpaceFolders = () => {
    
    const {id} = useParams()
    const {user} = useAuth()
    const navigate = useNavigate()
    
    /* State dans le tableau des dépendances pour mettre à jour
    l'affichage après suppression d'un dossier */
    const [toggle, setToggle] = useState(false)
    
    const [allFolders, setAllFolders] = useState([])
    const [darkerBg, setDarkerBg] = useState("display-none")
    const [selectedModal, setSelectedModal] = useState(null)
    
    
    
    useEffect(() => {
        
        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchUserFolders = async () => {
            try {
                
                const serverRes = await axios.get(`/api/folders/getall/${id}`, {headers : token()})
                setAllFolders(serverRes.data)

            } catch(e) {}
        }
        
        fetchUserFolders()
    }, [toggle])
    

    // Fonction qui fait apparaitre un modale qui est un menu pour un dossier
    // Menu pour supprimer ou modifier un dossier
    const handleClick = (e, folderIndex) => {
        e.preventDefault() // Pour bloquer le comportement par défault du navlink
        setSelectedModal(folderIndex)
        setDarkerBg("darken-background")
        document.body.style.overflow = "hidden"
    }
    
    
    // Fonction pour fermer le modale
    const handleHideModal = () => {
        setDarkerBg("display-none")
        setSelectedModal(null)
        document.body.style.overflow = ""
    }
    
    
    // Fonction pour supprimer un dossier
    const handleDelete = async (folderIndex) => {
        
        const confirmModal = window.confirm("Voulez-vous vraiment supprimer ce dossier, cela entrainera la suppression de toutes les flashcards contenus dedans ?")
        
        if (confirmModal) {
            
            setDarkerBg("display-none")
            setSelectedModal(null)
            setToggle(!toggle)
            document.body.style.overflow = ""
            
            try {
                
                const serverRes = await axios.delete(`/api/folders/delete/${folderIndex}`, {headers : token()})
                
                console.log(serverRes.data.message)
                return toast.success(serverRes.data.message)
                
            } catch (e) {
                return toast.error(e.response.data.message)
            }
        }
    }
    
    
    return (
        
        <main className="folders-workspace-main">
        
        
            {/****** Arrière plan noir transparent du modale ******/}
            <div  className={`modal-background ${darkerBg}`} onClick={handleHideModal}></div>
            
            
            <h1 className="folders-workspace-main-title">Mon espace de travail</h1>
            
            
            {/********* Section principal ***********/}
            <section className="folders-workspace-section">
                
                <h2>Mes dossiers</h2>
                
                
                {/********* Bouton créer un dossier ***********/}
                <NavLink to="/user/monespacedetravail/creerdossier" className="workspace-add-button"> Créer un dossier </NavLink>
                
                
                {/****** Section affichage de tout les dossiers ******/}
                <section className="workspace-section-flex">
                    
                    {allFolders.length < 1 ? (
                            <p className="worskpace-nodata">Vous n'avez aucun dossier</p>
                        ) : (
                            allFolders.map((oneFolder) => (
                                <>
                                <NavLink to={`/user/monespacedetravail/flashcard/${oneFolder._id}`} className="workspace-folder" key={oneFolder._id}><Folder className="folder-icon" /> {oneFolder.title} 
                                
                                    <CircleEllipsis onClick={(e) => handleClick(e, oneFolder._id)} className="folder-menu-button" />
                            
                                </NavLink>
                                
                                
                                {/****** Modale menu de dossier ******/}
                                <section key={oneFolder._id} className={`select-menu-modal ${selectedModal === oneFolder._id ? "display" : "display-none"}`}>
                                    <ul className="modal-menu-list">
                                        <li><NavLink className="modal-navlink" to={`/user/monespacedetravail/modifierdossier/${oneFolder._id}`} > <Pen color="#4a08e2" /> Modifier le dossier</NavLink></li>
                                        <li><NavLink onClick={() => handleDelete(oneFolder._id)} className="modal-navlink-delete" to="#" > <Trash2 color="#da0707" /> Supprimer le dossier </NavLink></li>
                                    </ul>
                                    <X onClick={handleHideModal} className="close-modal"/>
                                </section>
                            </>
                            ))
                        )}
                
                </section>
                
                
            </section>
            
        </main>
    )
}


export default WorkSpaceFolders