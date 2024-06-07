import {useParams, NavLink} from 'react-router-dom'
import {useEffect} from 'react'
import {useAuth} from '../context/AuthContext'

const OnetutorialPage = () => {
    
    const {id} = useParams()
    const {user} = useAuth()
    
    /* Tableau des articles tutoriels */
    const tutorialArray = [
        { 
            id:3,
            title : "Comment faire des flashcards ?",
            summary : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, accusamus, quae qui ad repellendus tenetur error impedit consequuntur. Sint, vitae.",
            image : "./src/assets/img-tuto-flashcard-V3.svg",
            paragtitle1 : "ETAPE 1 - Lorem ipsum dolor",
            parag1 : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, cupiditate voluptas adipisci ipsum fugiat temporibus earum recusandae quo eveniet voluptatibus ea pariatur nemo consectetur consequuntur iste repellat aliquam nihil dolorem natus dolor voluptates corrupti unde blanditiis sunt sapiente. Voluptatum, consequuntur, facere magnam sunt dolore cum molestiae inventore veniam unde nesciunt architecto iste nemo explicabo soluta ipsam sit aspernatur harum voluptatem deleniti culpa assumenda dolorum maiores tempora. Veniam, odio, maiores, harum, aliquid facilis tempora dignissimos exercitationem eos aspernatur sequi ab necessitatibus.",
            
            paragtitle2:"ETAPE 2 - Molestiae, perferendis, laboriosam",
            parag2 :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, veniam facilis unde laboriosam ex at fugit obcaecati excepturi libero nobis.",
            
            paragtitle3:"ETAPE 3 - Quasi, dolorum, quos",
            parag3 :"Et, harum est temporibus optio sunt nihil incidunt pariatur ab accusamus quo repellat tempore recusandae inventore porro tempora similique excepturi?",
            
            paragtitle4:"ETAPE 4 - Blanditiis, ratione, excepturi",
            parag4 :"Iure, neque, animi necessitatibus incidunt magni minus saepe sint voluptatum reiciendis natus rerum rem beatae molestias! Reiciendis voluptatibus dolore exercitationem.",
            
            paragtitle5:"ETAPE 5 - Saepe, tempore enim",
            parag5 :"Ipsa, labore, atque dolores ratione velit enim quod delectus quisquam unde iure commodi dolorum eius expedita minus dolor nobis cumque.",
            
            paragtitle6:"ETAPE 6 - Incidunt, debitis, perspiciatis",
            parag6 :"Recusandae, ipsa, odit, voluptatum blanditiis repudiandae accusamus veniam obcaecati odio ut suscipit tenetur nulla eveniet consequatur sed iure delectus ullam."
        },
        {
            id:1,
            title: "Lorem ipsum dolor sit amet ?",
            summary:"Porro, reiciendis quis veniam cum nostrum incidunt fugit voluptatibus voluptate? Corrupti officia ratione sed pariatur corporis nostrum veniam nisi eaque.",
            image:"./src/assets/img-tuto-fichedenote-V3.svg",
            text : "Illum, doloremque, expedita, ullam magnam eius vitae recusandae voluptatibus rerum pariatur quod iusto voluptatem. Corrupti, amet, accusantium reprehenderit iusto impedit voluptates molestias quo incidunt soluta totam earum dolorem tenetur animi ipsum rem. Consequatur, dolor, nesciunt, quam ad rerum nemo magnam quos labore facilis sapiente nam nulla ex eligendi autem et quisquam hic quo nobis explicabo quasi perferendis totam necessitatibus quidem. Sint, explicabo, quia, alias molestiae dolorum exercitationem tenetur et quasi ex ut dolorem sunt. Minus architecto ullam quaerat doloremque deserunt?",
            paragtitle1 : "ETAPE 1 - Lorem ipsum dolor",
            parag1 : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, cupiditate voluptas adipisci ipsum fugiat temporibus earum recusandae quo eveniet voluptatibus ea pariatur nemo consectetur consequuntur iste repellat aliquam nihil dolorem natus dolor voluptates corrupti unde blanditiis sunt sapiente. Voluptatum, consequuntur, facere magnam sunt dolore cum molestiae inventore veniam unde nesciunt architecto iste nemo explicabo soluta ipsam sit aspernatur harum voluptatem deleniti culpa assumenda dolorum maiores tempora. Veniam, odio, maiores, harum, aliquid facilis tempora dignissimos exercitationem eos aspernatur sequi ab necessitatibus.",
            
            paragtitle2:"ETAPE 2 - Molestiae, perferendis, laboriosam",
            parag2 :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, veniam facilis unde laboriosam ex at fugit obcaecati excepturi libero nobis.",
            
            paragtitle3:"ETAPE 3 - Quasi, dolorum, quos",
            parag3 :"Et, harum est temporibus optio sunt nihil incidunt pariatur ab accusamus quo repellat tempore recusandae inventore porro tempora similique excepturi?",
            
            paragtitle4:"ETAPE 4 - Blanditiis, ratione, excepturi",
            parag4 :"Iure, neque, animi necessitatibus incidunt magni minus saepe sint voluptatum reiciendis natus rerum rem beatae molestias! Reiciendis voluptatibus dolore exercitationem.",
            
            paragtitle5:"ETAPE 5 - Saepe, tempore enim",
            parag5 :"Ipsa, labore, atque dolores ratione velit enim quod delectus quisquam unde iure commodi dolorum eius expedita minus dolor nobis cumque.",
            
            paragtitle6:"ETAPE 6 - Incidunt, debitis, perspiciatis",
            parag6 :"Recusandae, ipsa, odit, voluptatum blanditiis repudiandae accusamus veniam obcaecati odio ut suscipit tenetur nulla eveniet consequatur sed iure delectus ullam."
            
        },
        {
            id:2,
            title: "Maiores optio amet a illum ?",
            summary:"Magni, animi, at earum est architecto dignissimos fugit ex error odio porro sapiente laboriosam saepe minus necessitatibus consectetur. Nam, necessitatibus.",
            image:"./src/assets/img-tuto-prisedenote-V3.svg",
            text:"Eos, asperiores, vero sequi officiis minima deserunt voluptates a necessitatibus iste aliquam reprehenderit enim id accusantium itaque numquam nesciunt sed voluptate aut optio dolorum! Modi, hic, ducimus, natus aut maiores illo perspiciatis eos odio iste iusto voluptatem labore minima suscipit nesciunt ipsum cumque voluptas facilis voluptates vero quod reprehenderit amet adipisci aliquid laborum cum reiciendis voluptatibus obcaecati eaque ratione quasi error fuga nisi fugit esse magni saepe molestiae sequi soluta consectetur totam. Nostrum, minus, totam error officiis in at ea.",
            paragtitle1 : "ETAPE 1 - Lorem ipsum dolor",
            parag1 : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, cupiditate voluptas adipisci ipsum fugiat temporibus earum recusandae quo eveniet voluptatibus ea pariatur nemo consectetur consequuntur iste repellat aliquam nihil dolorem natus dolor voluptates corrupti unde blanditiis sunt sapiente. Voluptatum, consequuntur, facere magnam sunt dolore cum molestiae inventore veniam unde nesciunt architecto iste nemo explicabo soluta ipsam sit aspernatur harum voluptatem deleniti culpa assumenda dolorum maiores tempora. Veniam, odio, maiores, harum, aliquid facilis tempora dignissimos exercitationem eos aspernatur sequi ab necessitatibus.",
            
            paragtitle2:"ETAPE 2 - Molestiae, perferendis, laboriosam",
            parag2 :"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, veniam facilis unde laboriosam ex at fugit obcaecati excepturi libero nobis.",
            
            paragtitle3:"ETAPE 3 - Quasi, dolorum, quos",
            parag3 :"Et, harum est temporibus optio sunt nihil incidunt pariatur ab accusamus quo repellat tempore recusandae inventore porro tempora similique excepturi?",
            
            paragtitle4:"ETAPE 4 - Blanditiis, ratione, excepturi",
            parag4 :"Iure, neque, animi necessitatibus incidunt magni minus saepe sint voluptatum reiciendis natus rerum rem beatae molestias! Reiciendis voluptatibus dolore exercitationem.",
            
            paragtitle5:"ETAPE 5 - Saepe, tempore enim",
            parag5 :"Ipsa, labore, atque dolores ratione velit enim quod delectus quisquam unde iure commodi dolorum eius expedita minus dolor nobis cumque.",
            
            paragtitle6:"ETAPE 6 - Incidunt, debitis, perspiciatis",
            parag6 :"Recusandae, ipsa, odit, voluptatum blanditiis repudiandae accusamus veniam obcaecati odio ut suscipit tenetur nulla eveniet consequatur sed iure delectus ullam."
        }
    ]
    
    
    useEffect(() => {
        
        scrollTo(0,0)
        
    }, [id])
    
    
    let oneTuto = tutorialArray.find((oneArticle) => oneArticle.id === parseInt(id))


    return (
        <>
          {/**** Le scroll inspector ******/}    
          <div className="home-scroll-inspector"></div>
          
          {/***** Contenu principal ******/}
          <main className="container onetutorialpage-main">
                
                <article className="onetutorialpage-article" >
                
                    <h1 className="onetutorialpage-article-h1">{oneTuto.title}</h1>
                    
                    <section>
                       <h2>{oneTuto.paragtitle1}</h2>
                       <p>{oneTuto.parag1}</p>
                    </section>
                    
                    <section>
                       <h2>{oneTuto.paragtitle2}</h2>
                       <p>{oneTuto.parag2}</p>
                    </section>
                    
                    <section>
                       <h2>{oneTuto.paragtitle2}</h2>
                       <p>{oneTuto.parag2}</p>
                    </section>
                    
                    <section>
                       <h2>{oneTuto.paragtitle3}</h2>
                       <p>{oneTuto.parag3}</p>
                    </section>
                    
                    <section>
                       <h2>{oneTuto.paragtitle4}</h2>
                       <p>{oneTuto.parag4}</p>
                    </section>
                    
                    <section>
                       <h2>{oneTuto.paragtitle5}</h2>
                       <p>{oneTuto.parag5}</p>
                    </section>
                    
                    <nav className="onetutorialpage-navlink-flex">
                    
                        {parseInt(id) >= 2 && (
                            <NavLink className="onetutorialpage-navlink-nextprev" to={`/tutoriel/article/${oneTuto.id-1}`}> Article précédent </NavLink>
                        )}
                        
                        {parseInt(id) < tutorialArray.length && (
                            <NavLink className="onetutorialpage-navlink-nextprev" to={`/tutoriel/article/${oneTuto.id+1}`}> Article suivant </NavLink>
                        )}

                    </nav>
                    
                    {user && !user.userToken && (
                        <NavLink className="onetutorialpage-navlink-calltoaction" to="/inscription"> Inscrivez-vous pour commencer </NavLink>
                    )}
                    
                </article>
                
            </main>
          </>
    )
}

export default OnetutorialPage