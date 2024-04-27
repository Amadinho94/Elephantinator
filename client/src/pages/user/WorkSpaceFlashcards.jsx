import {useState, useEffect} from "react"
import {useParams, NavLink} from "react-router-dom"
import axios from "axios"
import {useAuth} from '../../context/AuthContext'
import {token} from "../../context/token"
import {toast} from "react-toastify"
import { X, StickyNote, CircleEllipsis, Trash2, Pen, ChevronsLeft, ChevronsRight} from 'lucide-react';



const WorkSpaceFlashcards = () => {
    
    
    /* State qui stocke l'id de la flashcard sur laquelle
    une action va être effectué */
    // Affichage, suppression ou modification
    const [selectedFlashcard, setSelectedFlashcard] = useState(null)
    
    /* State dans le tableau des dépendances pour mettre à jour
    l'affichage après suppression d'une flashcard */
    const [toggle, setToggle] = useState(false)
    
    /* State qui stocke le texte écris sur le bouton pour retourner 
    une flashcard */
    const [otherSide, setOtherSide] = useState("Verso")
    
    /* State qui indique si l'animation de retournement
    est en cours ou non */
    const [isFlipping, setIsFlipping] = useState(false)
    
    /* State qui indique si la flashcard est retourner (verso = true)
    ou pas (recto = false) */
    const [flipper, setFlipper] = useState(false)
    
    /* State qui stocke la classe qui déclenche
    l'animation de retournement */
    const [flip, setFlip] = useState("")
    
    
    const {user} = useAuth()
    const {folderId} = useParams()
    
    const [allFlashcards, setAllFlashcards] = useState([])
    const [currentFolder, setCurrentFolder] = useState([])
    const [darkerBg, setDarkerBg] = useState("display-none")
    const [selectedModal, setSelectedModal] = useState(null)
    const [revisionBoard, setRevisionBoard] = useState(false)
    const [nextIndex, setNextIndex] = useState(0)
    const [displayedCard, setDisplayedCard] = useState({})
    const [endRevision, setEndRevision] = useState(false)
    const [goodAnswer, setGoodAnswer] = useState(0)
    const [goodAnsweredFlashcards, setGoodAnsweredFlashcards] = useState([])
    const [badAnsweredFlashcards, setBadAnsweredFlashcards] = useState([])
    const [finalResult, setFinalResult] = useState({
        numbersGoodAnswers : 0,
        numbersQuestions : 0,
        goodAnswerFlashcards : [],
        badAnswerFlashcards : []
    })
    
    
    
    
    useEffect(() => {

        scrollTo(0,0)
        document.body.style.overflow = ""
        
        const fetchUserFlashcards = async () => {
            try {
                
                const fetchFolder = await axios.get(`/api/folders/getone/${folderId}`, {headers : token()})
                setCurrentFolder(fetchFolder.data)
                
                const serverRes = await axios.get(`/api/flashcards/getall/${folderId}`, {headers : token()})
                await setAllFlashcards(serverRes.data)
                
            } catch(e) {
                
            }
        }
        
        fetchUserFlashcards()
    }, [toggle])
    
    
    
    // Fonction qui fait apparaitre un modale qui est un menu pour une flashcard
    // Menu pour supprimer ou modifier une flashcard
    const handleClick = (e, flashcardIndex) => {
        
        e.stopPropagation()
        setSelectedModal(flashcardIndex)
        setDarkerBg("darken-background")
        document.body.style.overflow = "hidden"
    }
    
    
    // Fonction pour afficher une flashcard dans un modale
    const handleDisplay = (flashcard) => {
        
            setDarkerBg("darken-background")
            document.body.style.overflow = "hidden"
            setSelectedFlashcard(flashcard)
    }
    
    
    // Fonction pour retourner la flashcard (recto ou verso)
    const flipSide = () => {
        
        if (otherSide === "Recto") {
            
            setOtherSide("Verso")
            setFlip("flip-again")
            setIsFlipping(true)
            
        } else {
            
            setOtherSide("Recto")
            setIsFlipping(true)
            setFlip("flip-back")
            
        }
        
        setFlipper(!flipper)
    }
    
    
    // Fonction pour fermer les modales
    const handleHideModal = () => {
        
        setDarkerBg("display-none")
        setSelectedModal(null)
        document.body.style.overflow = ""
        setSelectedFlashcard(null)
        setFlipper(false)
        setOtherSide("Verso")
        setFlip("")
        setRevisionBoard(false)
        setNextIndex(0)
        setEndRevision(false)
        setGoodAnswer(0)
        
        setFinalResult({
            numbersGoodAnswers : 0,
            numbersQuestions : 0,
            goodAnswerFlashcards : [],
            badAnswerFlashcards : []
        })
        
        setGoodAnsweredFlashcards([])
        setBadAnsweredFlashcards([])
    }
    
    
    // Fonction pour supprimer une flashcard
    const handleDelete = async (flashcardIndex) => {
        
        setDarkerBg("display-none")
        setSelectedModal(null)
        setToggle(!toggle)
        document.body.style.overflow = ""
        
        try {
            
            const serverRes = await axios.delete(`/api/flashcards/delete/${flashcardIndex}`, {headers : token()})
            
            return toast.success(serverRes.data.message)
            
        } catch (e) {
            
            return toast.error(e.response.data.message)
        }
    }
    
    
    // Fonction démarrage de révision
    const handleStart = () => {
        setDarkerBg("darken-background")
        document.body.style.overflow = "hidden"
        setRevisionBoard(true)
        
        setNextIndex(nextIndex + 1)
        setDisplayedCard(allFlashcards[nextIndex])
    }
    
    
    // Fonction pour passer à la flashcard suivante pendant révision
    // Et stocker le résultat dans la base de donnée
    const handleNextFlashcard = async (result, flashcardId) => {
        
        setGoodAnswer(prevGoodAnswer => prevGoodAnswer + (result === "success" ? 1 : 0))
        
        
        if (nextIndex < allFlashcards.length) {
            
            setDisplayedCard(allFlashcards[nextIndex])
            
            setFlipper(false)
            setOtherSide("Verso")
            setFlip("")
            
            
            if (result === "success") {
                
                if (!goodAnsweredFlashcards.includes(flashcardId)) {
                    setGoodAnsweredFlashcards([...goodAnsweredFlashcards, flashcardId])
                }
                
            } else if (result === "fail") {
                
                if (!badAnsweredFlashcards.includes(flashcardId)) {
                     setBadAnsweredFlashcards([...badAnsweredFlashcards, flashcardId])
                }
            }
            
            setNextIndex(nextIndex + 1)
            
        } else {
            
            
            setEndRevision(true)
            
            try {
                
                // setFinalResult({...finalResult, 
                //     numbersGoodAnswers : parseInt(goodAnswer),
                //     numbersQuestions : parseInt(allFlashcards.length),
                //     goodAnswerFlashcards : goodAnsweredFlashcards,
                //     badAnswerFlashcards : badAnsweredFlashcards
                // })
                
                const result =  {
                    ...finalResult, numbersGoodAnswers : parseInt(goodAnswer),
                    numbersQuestions : parseInt(allFlashcards.length),
                    goodAnswerFlashcards : goodAnsweredFlashcards,
                    badAnswerFlashcards : badAnsweredFlashcards
                }
                
                
                const serverRes = await axios.post(`/api/results/create/${folderId}`, result, {headers : token()})
                
                setFinalResult({
                    numbersGoodAnswers : 0,
                    numbersQuestions : 0,
                    goodAnswerFlashcards : [],
                    badAnswerFlashcards : []
                })
                
               setGoodAnsweredFlashcards([])
               setBadAnsweredFlashcards([])
    
                toast.success(serverRes.data.message)
                
            } catch (e) {
                toast.error(e.response.data.message)
            }
            
        }
    }
    
    
    

    
    
    
    
    return (
        <main className="flashcards-workspace-main container">
            
            
            {/******* Fil d'ariane **********/}
            <nav className="breadcrumbs">
                <NavLink className="breadcrumbs-lastpage" to={`/user/monespacedetravail/dossier/${user.id}`} >
                    Workspace
                </NavLink> <ChevronsRight size={32} />
                
                <NavLink className="breadcrumbs-currentpage" to="#">
                    Dossier {currentFolder.title}
                </NavLink>
            </nav>
            
            
            <h1 className="flashcards-workspace-main-title">Mon espace de travail</h1>
            
            
            {/****** Section principale ********/}
            <section className="flashcards-workspace-section">
            
                <h2>{`Dossier ${currentFolder.title}`}</h2>
                <p>{`Description : ${currentFolder.description}`}</p>
                
                
                
                {allFlashcards.length > 1 ? (
                    <>
                        <button onClick={handleStart} className="start-revision-button"> Démarrer une révision </button>
                        <h3>{allFlashcards.length < 2 ? "Flashcard du dossier" : "Les flashcards du dossier"}</h3>
                    </>
                    )
                        :
                    (
                        <p className="usermessage-minimum-flashcard">Il faut au moins 2 flashcards pour démarrer une révision</p>
                    )
                }
                
                
                {/****** Bouton créer une flashcard ******/}
                <NavLink to={`/user/monespacedetravail/creerflashcard/${currentFolder._id}`} className="workspace-add-button"> Créer une flashcard </NavLink>
                
                
                {/****** Section affichage de toutes les flashcards ******/}
                <section className="flashcards-section-flex">
                    
                    <div  className={`modal-background ${darkerBg}`} onClick={handleHideModal}></div>
                    {allFlashcards.length < 1 ? (
                            <p className="worskpace-nodata">Il n'y a aucune flashcard dans ce dossier</p>
                        ) : (
                            
                            allFlashcards.map((oneFlashcard) => (
                          <>  
                            <div  onClick={() => handleDisplay(oneFlashcard._id)} className="workspace-flashcard" key={oneFlashcard.id}>
                                <StickyNote className="flashcard-icon"/>
                                {oneFlashcard.rectoContent}
                                <CircleEllipsis onClick={(e) => handleClick(e, oneFlashcard._id)} className="folder-menu-button" />
                            </div>
                            
                            
                            
                            {/****** Modale menu flashcard (modifier ou supprimer une flashcard) ********/}
                            <section className={`select-menu-modal ${selectedModal === oneFlashcard._id ? "display" : "display-none"}`}>
                                <ul className="modal-menu-list">
                            
                                    <li><NavLink className="modal-navlink" to={`/user/monespacedetravail/modifierflashcard/${oneFlashcard._id}`} > <Pen color="#4a08e2" /> Modifier la flashcard</NavLink></li>
                                    <li><NavLink onClick={() => handleDelete(oneFlashcard._id)} className="modal-navlink-delete" to="#" > <Trash2 color="#da0707" /> Supprimer la flashcard </NavLink></li>
                                
                                </ul>
                                
                                <X onClick={handleHideModal} className="close-modal"/>
                            
                            </section>
                            
                            
                            
                            {/******* Modale qui affiche une flashcard (recto et verso) *******/}
                            <section onAnimationEnd={() => setIsFlipping(false)} className={`flashcard-modal ${flip} ${selectedFlashcard === oneFlashcard._id ? "display" : "display-none"}`}>
                                
                                    <h1 className="flashcard-title"> {flipper ? "RÉPONSE" : "QUESTION"} </h1>
                                    {!isFlipping && (
                                    <>
                                        <h2 className={`flashcard-content ${flipper ? "flashcard-verso-reveal" : ""}`}> {!flipper ? oneFlashcard.rectoContent : oneFlashcard.versoContent} </h2>
                                    </>
                                    )}
                                        
                                    <button onClick={flipSide} className="flashcard-flipper-button"> {otherSide} </button>
                                    
                                    <X onClick={handleHideModal} className="close-modal"/>
                              
                            </section>
                        </>
                        ))
                    )}
                    
                    
                    
                    {/******* Modale de révision des flashcards *******/}
                    <section onAnimationEnd={() => setIsFlipping(false)} className={`flashcard-modal ${flip} ${revisionBoard ? "display" : "display-none"}`}>
                        
                        {endRevision ? (
                            <>
                                <h1>RÉVISION TERMINÉE</h1>
                                <h2 className={goodAnswer >= allFlashcards.length/2 ? "good-result" : "bad-result"}  >
                                    {goodAnswer !== allFlashcards.length ?
                                        `${goodAnswer > 0 ? 
                                            `${goodAnswer < allFlashcards.length/2 ? 
                                                `Vous n'avez trouvé ${goodAnswer === 1 ? "qu'" : "que"} ${goodAnswer}` :
                                                `Vous avez trouvé ${goodAnswer}`} ${goodAnswer < 2 ? "bonne réponse" : "bonnes réponses"} sur les ${allFlashcards.length} questions` :
                                        `Vous n'avez trouvé aucune bonne réponse sur les ${allFlashcards.length} questions`}` :
                                    `Félicitations vous avez trouvé la bonne réponse aux ${allFlashcards.length} questions`}
                                </h2>
                            </>
                        ) : (
                            <>
                                <h1 className="flashcard-title"> {flipper ? "RÉPONSE" : "QUESTION"} </h1>
                            
                            {!isFlipping && (
                            <>
                                <h2 className={`flashcard-content ${flipper ? "flashcard-verso-reveal" : ""}`}> {!flipper ? displayedCard.rectoContent : displayedCard.versoContent} </h2>
                            </>
                            )}
                            
                            <button onClick={flipSide} className="flashcard-flipper-button"> {otherSide} </button>
                            
                            
                            
                            {!isFlipping && flipper && (
                                <div className="flashcard-test-button-flex">
                                    <button onClick={() => handleNextFlashcard("success", displayedCard._id)} className="flashcard-success-button" > Réussite </button> <button  onClick={() => handleNextFlashcard("fail", displayedCard._id)} className="flashcard-fail-button"> Échec </button>
                                </div>
                            )}
                        </>
                    
                    
                        )}
                        <X onClick={handleHideModal} className="close-modal"/>
                        
                    </section>
               
               
               
               
                </section>
            </section>
        
        </main>
    )
}

export default WorkSpaceFlashcards