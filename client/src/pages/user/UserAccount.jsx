import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { BadgeCheck } from 'lucide-react';
import axios from 'axios'
import {toast} from 'react-toastify'
import {token} from "../../context/token"

const UserAccount = () => {
    
    const {user} = useAuth()
    const API_URL = import.meta.env.VITE_API_URL
    
    useEffect(() => {
        scrollTo(0,0)
    }, [])
    
    const handleDelete = async (e) => {
        e.preventDefault()
        
        try {
            const serverRes = await axios.delete(`/api/users/deleteone/${user.id}`, {headers : token()})
            toast.success(serverRes.data.message)
        } catch (e) {
            toast.error(e.response.data.message)
        }
    }
    
    
    return (
        <main className="accountpage-main">
          <section>
                <header className="accountpage-header-accountpage-header">
                    <h1 className="accountpage-header-title">MON COMPTE</h1>
                    <figure className="accountpage-header-pp-container">
                        <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                    </figure>
                    <h2 className="accountpage-header-username">{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
                </header>
                <section>
                    
                    <section className="accountpage-section-userdata">
                        <h3 className="accountpage-section-title">Mes informations</h3>
                        <section className="accountpage-userinfo">
                             <p>Mon prénom</p>
                             <p className="accountpage-user-name">{user.name}</p>
                        </section>
                        
                        <section className="accountpage-userinfo">
                            <p>Mon adresse email</p>
                            <p className="accountpage-user-name">{user.email}</p>
                        </section>
                    </section>
                    
                    <section className="accountpage-section-navlink">
                        <NavLink className="accountpage-section-updateprofil" to="/user/modifiermoncompte"> Modifier mon compte </NavLink>
                        <NavLink className="accountpage-section-updateprofil" to="/user/modifiermotdepasse"> Modifier mon mot de passe </NavLink>
                        
                        <button onClick={handleDelete} disabled={user.role === "admin"} className={`${user.role === "admin" ? "disabled-delete-user-button" : "accountpage-button-deleteaccount"}`} > Supprimer mon compte </button>
                        {user.role === "admin" && ( <p className="accountpage-disabled-message">Un administrateur ne peut pas supprimer son propre compte</p> )}
                    </section>
                    
                    
                    
                </section>
          </section>
        </main>
    )
}

export default UserAccount