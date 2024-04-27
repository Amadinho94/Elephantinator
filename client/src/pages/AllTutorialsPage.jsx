import {NavLink} from 'react-router-dom'
import {useEffect} from 'react'

const AllTutorialsPage = () => {
    
    
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
    

    
    useEffect(() => {
        scrollTo(0,0)
    }, [])
    
    
    return (
        <main className="tutorial-main container">
           <h1>Guide d'utilisation</h1>
           
           <h2>Comment réussir ses flashcards ?</h2>
           <iframe width="90%" height="315" src="https://www.youtube.com/embed/fJ4ENhw-G4s?si=RmN3B9uPhvP7JA-n" title="Tutoriel sur comment bien faire des flashcards" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
           {/* BARRE DE RECHERCHE FAQ */}
           
           <div className="tutorialpage-div-flex">
           {tutorialArray.map((oneTutorial) => (
               <article key={oneTutorial.id} className="tutorialpage-article">
                    <section>
                        <h1>{oneTutorial.title}</h1>
                        <figure>
                          <img className="tutorialpage-article-img img-responsive" src={oneTutorial.image} alt={oneTutorial.title} />
                        </figure>
                        
                        <summary>{oneTutorial.summary}</summary>
                    </section>
                    <NavLink className="tutorialpage-article-navlink" to={`/tutoriel/article/${oneTutorial.id}`}> Lire plus </NavLink>
               </article>
           ))}
           </div>
        
        </main>
    )
}

export default AllTutorialsPage