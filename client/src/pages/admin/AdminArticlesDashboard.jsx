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
    
    const [articleToDelete, setArticleToDelete] = useState(null)
    const [articleToEdit, setArticleToEdit] = useState(null)
    
    const [userUpdatedRole, setUserUpdatedRole] = useState({
        role:""})
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    
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
    
    
    
    const handleHideModal = () => {
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setUserToDelete(null)
        setUserToEdit(null)
    }
    
    
    
    const showConfirmDeleteModal = (articleIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setArticleToDelete(articleIndex)
    }
    
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/articles//deleteonearticle/${articleToDelete}`, {headers : token()})
            
            setArticleToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    const redirectToArticleEditForm = (articleIndex) => {
        setTimeout(() => {
                navigate(`/admin/tableaudebord/gestionnairearticles/modifierarticle/${articleIndex}`)
        }, 100)
    }
    
    // const handleChange = (e) => {
    //     setUserUpdatedRole({...userUpdatedRole, role : e.target.value})
    // }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     displayConfirmEditModal()
    // }
    
    // const displayConfirmEditModal = () => {
    //     setShowEditModal(false)
    //     setShowConfirmEditModal(true)
    // }
    
    const handleEdit = async () => {
        setUpdatePage(!updatePage)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        
        try {
            
            if (userUpdatedRole.role !== "admin"
            && userUpdatedRole.role !== "user") {
                return toast.error("Role invalide")
            }
            
            const serverRes = await axios.put(`/api/users/updatestatus/${userToEdit}`, userUpdatedRole, {headers : token()})
            
            setUserToEdit(null)
            
            return toast.success(serverRes.data.message)
            
            setUserUpdatedRole({
                role:""
            })
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    return (
        <main className="adminarticlesdashboard-main container">
            
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Gestionnaire d'articles</NavLink>
            </nav>
            
            <h1>Gestionnaire d'articles</h1>
            
            <section className="adminarticlesdashboard-header-section">
                <figure className="adminarticlesdashboard-admin-pp">
                    <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                </figure>
                <h2>{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
                
            
            <NavLink className="admindashboard-create-button" to="/admin/tableaudebord/gestionnairearticles/creerarticle"> Créer un article</NavLink>
            
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