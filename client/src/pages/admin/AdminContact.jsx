import { useEffect , useState } from 'react'
import { NavLink , useNavigate , useParams} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {token} from "../../context/token"
import { ChevronsRight } from 'lucide-react';

const AdminContact = () => {
    
    const {contactId} = useParams()
    const navigate = useNavigate()
    
    const [oneContact, setOneContact] = useState({})
    
    /* Regex de voyelle pour adapter 
    l'affichage à la première lettre du nom de l'utilisateur */
    const usernameFirstletter = /[aeiouyAEIOUYÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝý]/ 
    
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    
    
    const [contactToDelete, setContactToDelete] = useState(null)
    const [contactToEdit, setContactToEdit] = useState(null)
    
    
    const [contactUpdatedStatus, setContactUpdatedStatus] = useState({
        status : ""
    })
        
    const [showConfirmEditModal, setShowConfirmEditModal] = useState(false)
    const [contactPreviousStatus, setContactPreviousStatus] = useState("")
    
    
    
    useEffect(() => {

        scrollTo(0,0)
        
        const fetchContact = async () => {
            
            try {
                
                const serverRes = await axios.get(`/api/contacts/getone/${contactId}`, {headers : token()})
                setOneContact(serverRes.data)
                console.log(contactId)
                
            } catch (e) {}
            
        }
        
        fetchContact()
        
    }, [])
    
    
    // Fonction pour fermer les modales
    const handleHideModal = () => {
        
        setShowEditModal(false)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        setContactToEdit(null)
    }
    
    
    // Fonction qui affiche le modal de changement de status d'un contact
    const displayEditModal = (contactIndex, contactStatus) => {
        
        setShowEditModal(true)
        document.body.style.overflow = "hidden"
        setContactToEdit(contactIndex)
        setContactPreviousStatus(contactStatus)
        setContactUpdatedStatus({
            status : contactStatus
        })
    }
    
    
    // Fonction qui change la valeur du status du contact
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
        
        // setUpdatePage(!updatePage)
        setShowConfirmEditModal(false)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.put(`/api/contacts/update/${contactToEdit}`, contactUpdatedStatus, {headers : token()})
            
            setContactToEdit(null)
            
            setTimeout(() => {
                
                navigate("/admin/tableaudebord/gestionnairecontacts")
                
            }, 100)
            
            return toast.success(serverRes.data.message)
            
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
            
        }
    }
    
    
    return (
        
        <main className="admincontact-main">
            
            
            {/******** Breadcrumbs ***********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord" >Tableau de bord admin</NavLink> <ChevronsRight size={32} /> 
                <NavLink className="breadcrumbs-lastpage" to="/admin/tableaudebord/gestionnairecontacts">Gestionnaire de contacts</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Message utilisateur</NavLink>
            </nav>
            
            
            <h1>Message {usernameFirstletter.test(oneContact.username) ? "d'" : "de"} {oneContact.username}</h1>
            
            
            {/****** Section des informations de l'utilisateur ayant laissé le message *******/}
            <section className="admincontact-user-info">
                <h2 className="admincontact-subtitle">Informations de l'utilisateur</h2>
                <p>Prénom : {oneContact.username}</p>
                <p>Adresse email : {oneContact.email}</p>
                <p>Objet du message : {oneContact.subjectMessage}</p>
                <p>Date et heure de l'envoi du message : {new Date(oneContact.createdAt).toLocaleDateString()} à {new Date(oneContact.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneContact.createdAt).getMinutes().toString().padStart(2, '0')}</p>
                <p>Status du message : {oneContact.status}</p>
            </section>
            
            
            {/******* Section du message de l'utilisateur ********/}
            <section>
                <h2 className="admincontact-subtitle">Message de l'utilisateur</h2>
                <section className="admincontact-usermessage">
                    <p>{oneContact.message}</p>
                </section>
            </section>
            
            
            {/****** Bouton modifier le status du message ******/}
            <section className="admincontactpage-status">
                <p>Status : {oneContact.status}</p>
                <button onClick={() => displayEditModal(oneContact._id, oneContact.status)} className="admincontactpage-update-button">Modifier le status</button>
            </section>
            
            
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

export default AdminContact