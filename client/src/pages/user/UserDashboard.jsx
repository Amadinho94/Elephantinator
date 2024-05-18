import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { BadgeCheck } from 'lucide-react';
import axios from 'axios'
import {toast} from 'react-toastify'
import {token} from "../../context/token"

const UserDashboard = () => {
    
    const {user} = useAuth()
    const API_URL = import.meta.env.VITE_API_URL
    const [allResults, setAllResults] = useState([])
    const [allFolders, setAllFolders] = useState([])
    
    
    useEffect(() => {

        scrollTo(0,0)
        
        const fetchData = async () => {
            try {
                
                const fetchResults = await axios.get(`/api/results/getrecentresults/${user.id}`, {headers : token()})
                setAllResults(fetchResults.data)
                
                const fetchFolders = await axios.get(`/api/folders/getall/${user.id}`, {headers : token()})
                setAllFolders(fetchFolders.data)
                
            } catch(e) {
                
            }
        }
        
        fetchData()
    }, [user])
    
    
    return (
        <main className="userdashboard-main">
        
            <h1>Tableau de bord {user.role === "admin" && `utilisateur`}</h1>
            
            {/********* En-tête de page *********/}
            <section className="userdashboard-header-section">
                    <figure className="userdashboard-pp-container">
                        <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} alt={`Photo de profil de ${user.username}`} />
                    </figure>
                    <h2 className="profilepage-header-username">{user.username} {user.role === "admin" && <BadgeCheck color="#24d90d" />}</h2>
            </section>
            
           
           {/********* Contenu principal de la page **********/} 
            <article className="userdashboard-article-flex">
                
                {/******* Section 5 dernières révisions ********/}
                <section className="userdashboard-sections">
                    <h3>5 dernières révisions</h3>
                    {allResults.length > 0 ? (
                        <>   
                            {allResults.map((oneResult) => (
                                <NavLink key={oneResult._id} className="userdashboard-resultlink" to="#">{oneResult.folderId.title} {new Date().toLocaleDateString() === new Date(oneResult.createdAt).toLocaleDateString() ? `aujourd'hui` : `le ${new Date(oneResult.createdAt).toLocaleDateString()}`} à {new Date(oneResult.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneResult.createdAt).getMinutes().toString().padStart(2, '0')} note de {oneResult.numbersGoodAnswers} sur {oneResult.numbersQuestions}</NavLink>
                            ))}
                            <NavLink to={`/user/tableaudebord/historiquerevision/${user.id}`} className="userdashboard-allresults-button"> Voir tout l'historique des révisions </NavLink>
                        </>                    
                    )
                        :
                    (
                        <>
                            <h1> Historique de révision vide </h1>
                            <NavLink to={`/user/monespacedetravail/dossier/${user.id}`} className="userdashboard-allresults-button"> Démarrer une révision </NavLink>
                        </>
                    )}
                </section>
                
                {/******* Section historiques de révisions des dossiers ********/}
                <section className="userdashboard-sections">
                
                    <h3>Historique des dossiers</h3>
                    
                    {allFolders.length > 0 ? (
                        (allFolders.map((oneFolder) => (
                            <NavLink key={oneFolder._id} className="userdashboard-folderlink" to={`/user/tableaudebord/historiquedossier/${oneFolder._id}`} > Historique de révision de {oneFolder.title} </NavLink>
                        )))
                    )
                        :
                    (
                        <>
                            <h1> Vous n'avez aucun dossier </h1> 
                            <NavLink to="/user/monespacedetravail/creerdossier" className="userdashboard-allresults-button"> Créer un dossier </NavLink>
                        </>
                    )}
                        
                    <section>
                        
                    </section>
                    
                </section>
                
            </article>
            
            {/****** Lien vers page mon compte *******/}
            <article>
                <NavLink to="/user/moncompte" className="userdashboard-myaccount-navlink"> Voir mon compte </NavLink>
            </article>
            
        
        </main>
    )
}

export default UserDashboard