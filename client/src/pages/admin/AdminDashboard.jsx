import { useEffect , useState } from 'react'
import { NavLink } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { BadgeCheck } from 'lucide-react';


const AdminDashboard = () => {
    
    const {user} = useAuth()
    
    const API_URL = import.meta.env.VITE_API_URL
    
     useEffect(() => {

        scrollTo(0,0)
        
    }, [])
    
    return (
        <main className="admindashboard-main">
        
            <h1>Tableau de bord administrateur</h1>
            
            {/****** Section d'en-tête ********/}
            <section className="admindashboard-header-section">
                <figure className="admindashboard-pp-container">
                    <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                </figure>
                <h2>{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
            
            
            {/******* Bloc des boutons vers les différents dashboards admin *******/}
            <article className="admindashboard-article">
                <NavLink className="admindashboard-article-navlink" to="/admin/tableaudebord/gestionnaireutilisateurs"> Gestionnaire d'utilisateurs </NavLink>
                <NavLink className="admindashboard-article-navlink" to="/admin/tableaudebord/gestionnairearticles"> Gestionnaire d'articles </NavLink>
                <NavLink className="admindashboard-article-navlink" to="/admin/tableaudebord/gestionnairecontacts"> Gestionnaire de contacts </NavLink>
                <NavLink className="admindashboard-article-navlink" to="#"> Gestionnaire de tutoriels </NavLink>
            </article>
            
        </main>
    )
}

export default AdminDashboard