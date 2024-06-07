import {NavLink} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'


const Home = () => {
    
    const { user } = useAuth()
    
    const [homeFirstBenefits, setHomeFirstBenefits] = useState({})
    const [homeSecondBenefits, setHomeSecondBenefits] = useState({})
    
    
    useEffect(() => {
        scrollTo(0,0)
        
            const fetchData = async () => {
                const res = await axios.get(`/api/articles/getallarticle`)
                await setHomeFirstBenefits(res.data[0])
                await setHomeSecondBenefits(res.data[1])
            }
        
        fetchData()
    }, [])
     
    
    // Tableau des feedbacks utilisateurs
    const clientsReviews = [
        {
            id:1,
            name : "Amadina",
            review : "Meilleur application React de l'histoire des applications React"
        },
        
        {
            id:2,
            name : "Lorema",
            review : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, vero, distinctio nostrum possimus necessitatibus corrupti animi blanditiis labore excepturi explicabo."
        },
        
        {
            id:3,
            name : "Ipsumo",
            review : "A iusto voluptatibus veniam quis. Distinctio, modi, illo deleniti maxime saepe corrupti facilis a vitae sed reprehenderit tenetur praesentium magni!"
        },
        
        {
            id:4,
            name : "Sergio Aguero",
            review : "Expedita, laboriosam neque obcaecati veniam maxime magnam quos nihil. Mollitia, necessitatibus unde dolore sit a hic aspernatur placeat autem maxime!"
        },
        
        {
            id:5,
            name : "Naruto",
            review : "Sapiente, nobis, provident, deserunt velit consectetur atque quam rem eveniet autem officia natus ipsa nesciunt expedita nisi magnam. Quasi, officia!"
        },
    
    ]
    
    // Tableau des tutoriels
    const tutorialArray = [
        { 
            id:3,
            presentation: "Faites des flashcards",
            title : "Comment faire des flashcards ?",
            summary : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, accusamus, quae qui ad repellendus tenetur error impedit consequuntur. Sint, vitae.",
            image : "./src/assets/img-tuto-flashcard-V4.svg",
            text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, cupiditate voluptas adipisci ipsum fugiat temporibus earum recusandae quo eveniet voluptatibus ea pariatur nemo consectetur consequuntur iste repellat aliquam nihil dolorem natus dolor voluptates corrupti unde blanditiis sunt sapiente. Voluptatum, consequuntur, facere magnam sunt dolore cum molestiae inventore veniam unde nesciunt architecto iste nemo explicabo soluta ipsam sit aspernatur harum voluptatem deleniti culpa assumenda dolorum maiores tempora. Veniam, odio, maiores, harum, aliquid facilis tempora dignissimos exercitationem eos aspernatur sequi ab necessitatibus."
        },
        {
            id:1,
            presentation: "Lorem ipsum dolor sit amet",
            title: "Lorem ipsum dolor sit amet ?",
            summary:"Porro, reiciendis quis veniam cum nostrum incidunt fugit voluptatibus voluptate? Corrupti officia ratione sed pariatur corporis nostrum veniam nisi eaque.",
            image:"./src/assets/img-tuto-fichedenote-V4.svg",
            text : "Illum, doloremque, expedita, ullam magnam eius vitae recusandae voluptatibus rerum pariatur quod iusto voluptatem. Corrupti, amet, accusantium reprehenderit iusto impedit voluptates molestias quo incidunt soluta totam earum dolorem tenetur animi ipsum rem. Consequatur, dolor, nesciunt, quam ad rerum nemo magnam quos labore facilis sapiente nam nulla ex eligendi autem et quisquam hic quo nobis explicabo quasi perferendis totam necessitatibus quidem. Sint, explicabo, quia, alias molestiae dolorum exercitationem tenetur et quasi ex ut dolorem sunt. Minus architecto ullam quaerat doloremque deserunt?"
        },
        {
            id:2,
            presentation : "Maiores optio amet a illum",
            title: "Maiores optio amet a illum ?",
            summary:"Magni, animi, at earum est architecto dignissimos fugit ex error odio porro sapiente laboriosam saepe minus necessitatibus consectetur. Nam, necessitatibus.",
            image:"./src/assets/img-tuto-prisedenote-V4.svg",
            text:"Eos, asperiores, vero sequi officiis minima deserunt voluptates a necessitatibus iste aliquam reprehenderit enim id accusantium itaque numquam nesciunt sed voluptate aut optio dolorum! Modi, hic, ducimus, natus aut maiores illo perspiciatis eos odio iste iusto voluptatem labore minima suscipit nesciunt ipsum cumque voluptas facilis voluptates vero quod reprehenderit amet adipisci aliquid laborum cum reiciendis voluptatibus obcaecati eaque ratione quasi error fuga nisi fugit esse magni saepe molestiae sequi soluta consectetur totam. Nostrum, minus, totam error officiis in at ea."
        }
    ]
    
    
    return (
       <>
       <div className="home-scroll-inspector"></div>
       
       <main className="home-container container">
       
           {/******** En-tête de la page d'accueil **********/}
           <header className="home-headline-background">
              
               <h1 className="home-headline-title">Réussissez tout vos examens</h1>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, assumenda ratione sed voluptates odit repudiandae nesciunt eius nisi facilis tempore.</p>
               <NavLink className="home-headline-calltoaction" to={user && user.userToken ? `/user/monespacedetravail/dossier/${user.id}` : "/inscription"}> Devenir un meilleur élève </NavLink>          
              
           </header>
           
           
           {/********* Contenu principal de la page d'accueil ********/}
           <article className="home-article">
           
              {/********* Section des cards des tutoriels **********/}
              <section>
                    <h1 className="home-section-h1">Obtenez de meilleurs notes</h1>
                    
                    <div className="home-cards-section-flex">
                    {tutorialArray.map ((oneTutorial) => (
                        
                       <div key={oneTutorial.id} className="home-article-cards">
                           <div>
                              <img className="home-card-img-responsive" src={oneTutorial.image} alt={`image du tutoriel ${oneTutorial.presentation}`}/>
                           </div>
                           
                           <div>
                               <h3>{oneTutorial.presentation}</h3>
                               <p>{oneTutorial.summary}</p>
                               <NavLink className="home-cards-calltoaction" to={`/tutoriel/article/${oneTutorial.id}`}> En savoir plus </NavLink>
                           </div>
                       </div>
                    ))}
                       
                    </div>  
              </section>
              
              
              {/********** Première Section d'un résumé d'un article du blog *********/}
              <section className="home-benefits-section">
                    <h1>Répétition espacée</h1>
                    <div className="home-benefits-flex-right">
                        <img className="home-benefits-img-responsive home-benefits-img-left" src="../src/assets/img-article-repetition-V4.svg" alt="image de l'article sur les répétitions espacées" />
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, doloremque numquam nulla laborum dolore ex rem necessitatibus est labore voluptates eos cumque temporibus neque esse in dicta alias velit aspernatur culpa omnis saepe illo nam quaerat itaque nobis voluptate tenetur doloribus architecto natus hic.</p>
                            <NavLink className="home-section-calltoaction" to={`/blog/article/${homeSecondBenefits._id}`}> En savoir plus </NavLink>
            
                        </div>
                    </div>
              </section>
              
              
              {/********* Deuxième section d'un résumé d'un article du blog *********/}
              <section className="home-benefits-section">
                    <h1>Rappels actifs</h1>
                    <div className="home-benefits-flex-left">
                        <img className="home-benefits-img-responsive home-benefits-img-right" src="../src/assets/img-article-rappel-V4.svg" alt="image de l'article sur les rappels actifs"/>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, beatae, ad repellat in eius facilis optio molestias eveniet error aperiam quasi at excepturi aliquam earum cumque nam blanditiis repellendus temporibus placeat harum magni voluptate quam nobis labore itaque quibusdam nulla sequi accurdo</p>
                            <NavLink className="home-section-calltoaction" to={`/blog/article/${homeFirstBenefits._id}`}> En savoir plus </NavLink>
                            
                        </div>
                    </div>
              </section>
           </article>
           
           
       </main>
       
       
       {/*********** Bloc du slider des feedbacks utilisateurs ***********/}
       <article className="home-client-feedback-block">
           <h1>Ce que nos utilisateurs pensent de nous</h1>
           <section className="home-client-feedback-section">
                {clientsReviews.map((oneReview) => (
                       <blockquote className="home-client-reviews-blockquote" key={oneReview.id}>
                          <p>{oneReview.review}</p>
                          <cite><strong>{oneReview.name}</strong></cite>
                       </blockquote>
                ))}
           </section>
       </article>
       
       
       {/************** Bloc des cards de présentation de l'équipe *********/}
       <article className="home-team-presentation-article">
           <h1>Notre équipe de choc</h1>
           <section className="home-team-presentation-section">
        
               <section className="home-team-presentation-card" >
                    <h1>Amadeus Mozart</h1>
                    <p>Designer</p>
               </section>
               
               <section className="home-team-presentation-card" >
                    <h1>Amadou Dramé</h1>
                    <p>Fondateur et PDG de Elephantinator</p>
               </section>
               
               <section className="home-team-presentation-card" >
                     <h1>Jean Amadouer</h1>
                     <p>Développeur</p>
               </section>
           </section>
       </article>
       
       </>
    )
}

export default Home