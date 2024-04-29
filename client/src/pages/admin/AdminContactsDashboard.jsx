import { useEffect , useState } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import {token} from "../../context/token"
import { ChevronsRight , BadgeCheck} from 'lucide-react';


const AdminContactsDashboard = () => {
   
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [allContacts, setAllContacts] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    
    
    const [contactToDelete, setContactToDelete] = useState(null)
    const [contactToEdit, setContactToEdit] = useState(null)
    
    
    const [contactUpdatedStatus, setContactUpdatedStatus] = useState({
        status : ""
    })
        
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    const [contactPreviousStatus, setContactPreviousStatus] = useState("")
    
    const API_URL = import.meta.env.VITE_API_URL
    
    
     useEffect(() => {

        scrollTo(0,0)
        
        const fetchAllContacts = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/contacts/getall`, {headers : token()})
                setAllContacts(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchAllContacts()
        
    }, [updatePage])
    
    
    // Fonction pour fermer les modales
    const handleHideModal = () => {
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setContactToDelete(null)
        setContactToEdit(null)
    }
    
    
    // Fonction qui affiche le modal de confirmation de suppression
    const showConfirmDeleteModal = (contactIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setContactToDelete(contactIndex)
    }
    
    
    // Fonction qui supprime un contact
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/contacts/delete/${contactToDelete}`, {headers : token()})
            
            setContactToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    // Fonction qui affiche le modal de modification de status d'un contact
    const displayEditModal = (contactIndex, contactStatus) => {
        setShowEditModal(true)
        document.body.style.overflow = "hidden"
        setContactToEdit(contactIndex)
        setContactPreviousStatus(contactStatus)
        setContactUpdatedStatus({
            status : contactStatus
        })
    }
    
    
    // Fonction qui change la valeur du status d'un contact
    const handleChange = (e) => {
        setContactUpdatedStatus({...contactUpdatedStatus, status : e.target.value})
    }
    
    
    // Fonction qui appel la fonction qui va afficher le modal de confirmation de modification de status d'un contact
    const handleSubmit = (e) => {
        e.preventDefault()
        displayConfirmEditModal()
    }
    
    
    // Fonction qui affiche le modal de confirmation de modification de status d'un contact
    const displayConfirmEditModal = () => {
        setShowEditModal(false)
        setShowConfirmEditModal(true)
    }
    
    
    // Fonction qui modifie le status d'un contact 
    const handleEdit = async () => {
        if (contactUpdatedStatus.status !== "in progress"
        && contactUpdatedStatus.status !== "completed") {
            setShowEditModal(true)
            setShowConfirmEditModal(false)
            return toast.error("Status invalide")
        } else if (contactUpdatedStatus.status === contactPreviousStatus) {
            setShowEditModal(true)
            setShowConfirmEditModal(false)
            return toast.error("Vous n'avez fait aucune modification")
        }
        
        setUpdatePage(!updatePage)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        
        try {
            
            
            const serverRes = await axios.put(`/api/contacts/update/${contactToEdit}`, contactUpdatedStatus, {headers : token()})
            
            setContactToEdit(null)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    
    
    
    
    return (
        <main className="adminusersdashboard-main container">
            
            
            {/******** Fil d'ariane **********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />  <NavLink className="breadcrumbs-currentpage" to="#">Gestionnaire de contacts</NavLink>
            </nav>
            
            
            <h1>Gestionnaire de contacts</h1>
            
            
            {/******** Section d'en-tête de la page *******/}
            <section className="adminusersdashboard-header-section">
                <figure className="adminusersdashboard-admin-pp">
                    <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                </figure>
                <h2>{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
                
            
            {/******** Tableau des contacts *********/}   
            <table className="admindashboard-table">
            
                <thead>
                    <tr>
                        <th className="admindashboard-display-rolcel">Prénom</th>
                        <th >Email</th>
                        <th className="admindashboard-display-emailcel">Objet du message</th>
                        {/*<th className="admindashboard-display-datecel">Date et heure</th>*/}
                        <th className="admindashboard-display-datecel">Status</th>
                        <th className="admindashboard-display-actioncel">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allContacts.map((oneContact) => (
                        <>
                            <tr key={oneContact._id}>
                                <td className="admindashboard-display-rolcel">{oneContact.username} </td>
                                <td >{oneContact.email}</td>
                                <td className="admindashboard-display-emailcel">{oneContact.subjectMessage}</td>
                                {/*<td className="admindashboard-display-datecel">{new Date(oneUser.createdAt).toLocaleDateString()} à {new Date(oneUser.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneUser.createdAt).getMinutes().toString().padStart(2, '0')}</td>*/}
                                <td className={`admindashboard-display-emailcel ${oneContact.status === "in progress" ? "contact-inprogress" : "contact-completed"}`} >{oneContact.status}</td>
                                <td className="admindashboard-display-actioncel"> <div className="adminusersdashboard-action-button-cel"> <NavLink className="admindashboard-see-navlink" to={`/admin/tableaudebord/gestionnairecontacts/contact/${oneContact._id}`}> Voir </NavLink> <button onClick={() => displayEditModal(oneContact._id, oneContact.status)} className="admincontactsdashboard-edit-button" > Modifier status </button> <button onClick={() => showConfirmDeleteModal(oneContact._id)} className="admincontactsdashboard-delete-button">Supprimer</button></div></td>
                            </tr>
                            
                        </>
                    ))}
                    
                    
                </tbody>
                
            </table>
                
                
            {/****** Modal de suppression de status ********/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment supprimer ce contact ?</p>
                        <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> 
                    </dialog>
                </>
            )}
            
            
            {/****** Modal de modification de status ********/}
            {showEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Modifier le status de ce contact</p>
                        
                        <form onSubmit={handleSubmit}>
                            <select className="modal-form-select" name="status" onChange={handleChange} value={contactUpdatedStatus.status}>
                                <option value="in progress">En attente</option>
                                <option value="completed">Complété</option>
                            </select>
                            
                            <button className="modal-valid-button" type="submit">Valider</button>
                        </form>
                        
                    </dialog>
                </>
            )}
            
            
            {/****** Modal de confirmation de modification de status ********/}
            {showConfirmEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment modifier le status de ce contact ?</p>
                        
                        <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button>
                        <button className="modal-confirm-edit-button"  onClick={() => handleEdit()}>Confirmer</button> 

                    </dialog>
                </>
            )}
               
                
           
        </main>
    )
    
}

export default AdminContactsDashboard