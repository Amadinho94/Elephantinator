import { useEffect , useState } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import {token} from "../../context/token"
import { ChevronsRight , BadgeCheck } from 'lucide-react';


const AdminArticlesDashboard = () => {
    
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [allArticles, setAllArticles] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    
    const [articleToDelete, setArticleToDelete] = useState(null)
    const [articleToEdit, setArticleToEdit] = useState(null)
    
    const [userUpdatedRole, setUserUpdatedRole] = useState({
        role:""
    })
        
    
    const API_URL = import.meta.env.VITE_API_URL
    
    
     useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllArticles = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/articles/getallarticle`, {headers : token()})
                setAllArticles(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchAllArticles()
        
    }, [updatePage])
    
    
    // Fonction qui ferme les modales
    const handleHideModal = () => {
        
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setArticleToDelete(null)
        setArticleToEdit(null)
    }
    
    
    // Fonction qui affiche le modal de suppression
    const showConfirmDeleteModal = (articleIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setArticleToDelete(articleIndex)
    }
    
    
    // Fonction qui supprime un article
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/articles/deleteonearticle/${articleToDelete}`, {headers : token()})
            
            setArticleToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    // Fonction qui redirige vers la page formulaire "modifier un article"
    const redirectToArticleEditForm = (articleIndex) => {
        setTimeout(() => {
                navigate(`/admin/tableaudebord/gestionnairearticles/modifierarticle/${articleIndex}`)
        }, 100)
    }
    
    
    
    return (
        <main className="adminarticlesdashboard-main container">
            
            {/******* Fil d'ariane ********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Gestionnaire d'articles</NavLink>
            </nav>
            
            
            <h1>Gestionnaire d'articles</h1>
            
            {/****** Section d'en-tête de la page *******/}
            <section className="adminarticlesdashboard-header-section">
                <figure className="adminarticlesdashboard-admin-pp">
                    <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                </figure>
                <h2>{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
                
            
            {/****** Bouton créer un article *********/} 
            <NavLink className="admindashboard-create-button" to="/admin/tableaudebord/gestionnairearticles/creerarticle"> Créer un article</NavLink>
            
            
            {/****** Tableau des articles *******/}
            <table className="admindashboard-table">
            
                <thead>
                    <tr>
                        <th>Titre de l'article</th>
                        <th className="admindashboard-display-authorcel">Nom de l'auteur</th>
                        <th className="admindashboard-display-datecel">Date de création</th>
                        <th className="admindashboard-display-actioncel">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allArticles.length < 1 ? (
                        <h1>Il n'y aucun article dans ce site</h1>
                    )
                        :
                    (
                        (allArticles.map((oneArticle) => (
                            <>
                                <tr key={oneArticle._id}>
                                    <td> <NavLink className="admindashboard-title-navlink" to={`/blog/article/${oneArticle._id}`} >{oneArticle.title}</NavLink> </td>
                                    <td className="admindashboard-display-authorcel">{oneArticle.authorName}</td>
                                    <td className="admindashboard-display-datecel">
                                        {new Date(oneArticle.createdAt).toLocaleDateString()} à {new Date(oneArticle.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneArticle.createdAt).getMinutes().toString().padStart(2, '0')}
                                    </td>
                                    <td className="admindashboard-display-actioncel">
                                        <div className="adminarticlesdashboard-action-button-cel">
                                            <button onClick={() => redirectToArticleEditForm(oneArticle._id)} className="adminarticlesdashboard-edit-button" > Modifier </button>
                                            <button onClick={() => showConfirmDeleteModal(oneArticle._id)} className="adminarticlesdashboard-delete-button">Supprimer</button>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )))
                    )}
                    
                </tbody>
                
            </table>
            
            
            {/****** Modal de suppression d'article ******/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment supprimer cette article ?</p>
                        <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> 
                    </dialog>
                </>
            )}
            
        </main>
    )
}

export default AdminArticlesDashboard