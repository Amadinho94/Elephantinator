import { useEffect , useState } from 'react'
import { NavLink , useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { token } from "../../context/token"
import { Dot , ChevronsRight , BadgeCheck } from 'lucide-react';



const AdminUsersDashboard = () => {
    
    const {user} = useAuth()
    const navigate = useNavigate()
    
    const [allUsers, setAllUsers] = useState([])
    const [updatePage, setUpdatePage] = useState(false)
    
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState(null)
    
    const [userUpdatedRole, setUserUpdatedRole] = useState({
        role:""
    })
    
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    const [userPreviousRole, setUserPreviousRole] = useState("")
    
    const API_URL = import.meta.env.VITE_API_URL
    
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchAllUsers = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/users/getall`, {headers : token()})
                setAllUsers(serverRes.data)
                
            } catch (e) {}
            
        }
        
        fetchAllUsers()
        
    }, [updatePage])
    
    
    /* Fonction qui ferme les modales */
    const handleHideModal = () => {
        setShowDeleteModal(false)
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setUserToDelete(null)
        setUserToEdit(null)
    }
    
    
    /* Fonction qui affiche le modal de confirmation de suppression */
    const showConfirmDeleteModal = (userIndex) => {
        setShowDeleteModal(true)
        document.body.style.overflow = "hidden"
        setUserToDelete(userIndex)
    }
    
    
    /* Fonction qui supprime un utilisateur */
    const handleDelete = async () => {
        
        setUpdatePage(!updatePage)
        setShowDeleteModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/users/deleteone/${userToDelete}`, {headers : token()})
            
            setUserToDelete(null)
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    /* Fonction qui affiche le modal de changement de status d'utilisateur */
    const displayEditModal = (userIndex, userRole) => {
        setShowEditModal(true)
        document.body.style.overflow = "hidden"
        setUserToEdit(userIndex)
        setUserPreviousRole(userRole)
        setUserUpdatedRole({
            role : userRole
        })
    }
    
    
    /* Fonction qui change la valeur des state en fonction 
    des changements du menu select */
    const handleChange = (e) => {
        setUserUpdatedRole({...userUpdatedRole, role : e.target.value})
    }
    
    
    /* Fonction qui affiche le modal de confirmation de changement le status d'un utilisateur */ 
    const handleSubmit = (e) => {
        e.preventDefault()
        displayConfirmEditModal()
    }
    
    
    /* Fonction qui affiche le modal de confirmation de changement de status d'utilisateur */
    const displayConfirmEditModal = () => {
        setShowEditModal(false)
        setShowConfirmEditModal(true)
    }
    
    
    /* Fonction qui mets à jour le status d'un utilisateur */
    const handleEdit = async () => {
        if (userUpdatedRole.role !== "admin"
        && userUpdatedRole.role !== "user") {
            setShowEditModal(true)
            setShowConfirmEditModal(false)
            return toast.error("Role invalide")
        } else if (userUpdatedRole.role === userPreviousRole) {
            setShowEditModal(true)
            setShowConfirmEditModal(false)
            return toast.error("Vous n'avez fait aucune modification")
        }
        
        setUpdatePage(!updatePage)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        
        try {
            
            
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
        <main className="adminusersdashboard-main container">
            
            {/***** Fil d'ariane *****/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} />  <NavLink className="breadcrumbs-currentpage" to="#">Gestionnaire d'utilisateurs</NavLink>
            </nav>
            
            <h1>Gestionnaire d'utilisateurs</h1>
            
            
            {/*** En-tête de la page ****/}
            <section className="adminusersdashboard-header-section">
                <figure className="adminusersdashboard-admin-pp">
                    <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                </figure>
                <h2>{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
            
            
            {/**** Bouton de création d'un utilisateur ******/}     
            <NavLink className="admindashboard-create-button" to="/admin/tableaudebord/gestionnaireutilisateurs/creerutilisateur"> Créer un utilisateur</NavLink>
            
            
            {/***** Tableau des utilisateurs *******/}
            <table className="admindashboard-table">
            
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th className="admindashboard-display-rolcel">Role</th>
                        <th className="admindashboard-display-emailcel">Email</th>
                        <th className="admindashboard-display-datecel">Date de création</th>
                        <th className="admindashboard-display-actioncel">Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {allUsers.map((oneUser) => (
                        <>
                            <tr key={oneUser._id}>
                                <td className={user.id === oneUser._id && "admindashboard-logged-admin"}> <div className="admindashboard-userpp-username">   <img className={`img-responsive ${user.id === oneUser._id ? "logged-admin-pp" : "adminusersdashboard-users-pp"}`} src={`${API_URL}/profilPicture/${oneUser.profilPicture}`} /> {oneUser.username} </div></td>
                                {/*alt={`Photo de profil de ${oneUser.username}`}*/}
                                <td className="admindashboard-display-rolcel">{oneUser.role} {oneUser.role === "admin" && <BadgeCheck color="#20fd1c" />}</td>
                                <td className="admindashboard-display-emailcel">{oneUser.email}</td>
                                <td className="admindashboard-display-datecel">{new Date(oneUser.createdAt).toLocaleDateString()} à {new Date(oneUser.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneUser.createdAt).getMinutes().toString().padStart(2, '0')}</td>
                                <td className="admindashboard-display-actioncel"> <div className="adminusersdashboard-action-button-cel"><button onClick={() => displayEditModal(oneUser._id, oneUser.role)} className="adminusersdashboard-edit-button" > {user.id === oneUser._id ? `Changer mon role` : `Changer le role`}</button> {user.id !== oneUser._id && <button onClick={() => showConfirmDeleteModal(oneUser._id)} className="adminusersdashboard-delete-button">Supprimer</button>}</div></td>
                            </tr>
                            
                        </>
                    ))}
                    
                    
                </tbody>
                
            </table>
            
            
            {/***** Modal de confirmation de suppression ***/}
            {showDeleteModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment supprimer ce compte ?</p>
                        <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button> <button className="modal-confirm-button"  onClick={() => handleDelete()}>Confirmer</button> 
                    </dialog>
                </>
            )}
            
            
            {/***** Modal de modification de status d'un utilisateur ***/}
            {showEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Modifier le role de ce compte</p>
                        
                        <form onSubmit={handleSubmit}>
                            <select className="modal-form-select" name="role" onChange={handleChange} value={userUpdatedRole.role}>
                                <option value="admin">Administrateur</option>
                                <option value="user">Utilisateur</option>
                            </select>
                            
                            <button className="modal-valid-button" type="submit">Valider</button>
                        </form>
                        
                    </dialog>
                </>
            )}
            
            
            {/***** Modal de confirmation de modification de status ***/}
            {showConfirmEditModal && (
                <>
                    <div onClick={() => handleHideModal()} className="modal-background"></div>
                    <dialog className="modal" open>
                        <p>Voulez-vous vraiment modifier le role de ce compte ?</p>
                        
                        <button className="modal-cancel-button" onClick={() => handleHideModal()}>Annuler</button>
                        <button className="modal-confirm-edit-button"  onClick={() => handleEdit()}>Confirmer</button> 

                    </dialog>
                </>
            )}
               
                
           
        </main>
    )
}

export default AdminUsersDashboard