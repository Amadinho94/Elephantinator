import { useEffect , useState } from 'react'
import { NavLink , useParams } from 'react-router-dom'
import axios from 'axios'
import { token } from "../../context/token"
import {toast} from "react-toastify"
import { Trash2 } from 'lucide-react';
import {useAuth} from '../../context/AuthContext'
import { ChevronsRight } from 'lucide-react';


const AllResults = () => {
    
    const {userId} = useParams()
    const {user} = useAuth()
    
    const [allResults, setAllResults] = useState([])
    const [toggle, setToggle] = useState(false)
    
    
    useEffect(() => {

        scrollTo(0,0)
        
        const fetchData = async () => {
            try {
                
                const fetchResults = await axios.get(`/api/results/getalluserresults/${userId}`, {headers : token()})
                setAllResults(fetchResults.data)
                
                
            } catch(e) {
                
            }
        }
        
        fetchData()
    }, [toggle])
    
    
    /* Fonction qui supprime tout les résultats de révisions de l'historique */
    const handleDeleteAll = async () => {
        
        setToggle(!toggle)
        
        try {
            
            const serverRes = await axios.delete(`/api/results/deleteallresults/${userId}`, {headers : token()})
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            return toast.error(e.response.data.message)
        }
    }
    
    
    
    
    return (
       
        <main className="allresults-main container">
            
            {/**** Fil d'ariane *****/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to="/user/tableaudebord" >Tableau de bord {user.role === "admin"&& "user"}</NavLink> <ChevronsRight size={32} />
                <NavLink className="breadcrumbs-currentpage" to="#">Historique de révision</NavLink>
            </nav>
            
            <h1>Tableau de bord {user.role === "admin" && `utilisateur`}</h1>
            
            {/***** Contenu principal ****/}
            <article className="allresults-article">
            
                <h2>Historique de révision</h2>
                
                {allResults.length < 1 ? (
                    <h3>Historique de révision vide</h3>
                )
                    :
                (
                    <>
                    <button onClick={() => handleDeleteAll()} className="allresults-deleteall-button">Supprimer tout l'historique</button>
                    <ul className="allresults-list">
                        {allResults.map((oneResult) => (
                        <>
                           <li key={oneResult._id}><p>{new Date().toLocaleDateString() === new Date(oneResult.createdAt).toLocaleDateString() ? `Aujourd'hui` : `Le ${new Date(oneResult.createdAt).toLocaleDateString()}`} à {new Date(oneResult.createdAt).getHours().toString().padStart(2, '0')}:{new Date(oneResult.createdAt).getMinutes().toString().padStart(2, '0')} : dossier {oneResult.folderId.title} avec une note de {oneResult.numbersGoodAnswers} sur {oneResult.numbersQuestions}</p> <Trash2 onClick={() => handleDeleteOne(oneResult._id)} className="allresults-deleteone-button" /> </li> 
                           </>
                        ))}
                    </ul>
                    </>
                )}
                
            </article>
            
        </main>
    )
}

export default AllResults