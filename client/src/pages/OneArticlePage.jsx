import {useParams, NavLink} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {useAuth} from '../context/AuthContext'


const OneArticlePage = () => {
    
    const {id} = useParams()
    const [selectedArticle, setSelectedArticle] = useState({})
    const {user} = useAuth()
    
    useEffect(() => {
        
        scrollTo(0,0)
        
        const fetchData = async () => {
            const res = await axios.get(`/api/articles/getonearticle/${id}`)
            await setSelectedArticle(res.data)
        }
        
        fetchData()
        
    }, [])
    
    
    // Tableau des articles du blog
    // const blogArticlesArray = [
    //     {
    //         id:1,
    //         title : "Les bénéfices de la répétition espacée",
    //         image : "../src/assets/img-final-repetition1.png",
    //         summary:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, molestiae, minus, sapiente inventore nihil error facere in veniam sequi iure voluptatum officia quaerat magnam aut suscipit ipsam reprehenderit perspiciatis temporibus. Dicta, repellendus, sequi, est deserunt accusantium adipisci ipsa enim dolor nulla eum voluptatum sunt ex nostrum consequuntur alias omnis nisi tempore quibusdam quam sit odio. Odit, repellendus soluta neque nisi provident mollitia earum eveniet facere suscipit illum debitis sed est maxime excepturi unde voluptas incidunt rem id quidem adipisci natus.",
    //         content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, praesentium, doloremque voluptas debitis atque vitae neque nihil pariatur dolorem quod harum vel qui non molestiae esse animi soluta ex voluptatem aperiam eaque dolorum illo deserunt iste earum doloribus modi sed voluptatum nostrum sapiente libero quos maxime impedit eveniet totam beatae cupiditate aspernatur error. Ullam, quia natus sint dicta debitis ducimus architecto minus sunt placeat aperiam delectus asperiores repellat ut libero sed quidem magnam fugit possimus mollitia voluptates perspiciatis dolore accusamus porro qui voluptatum. Ipsum ipsa suscipit libero earum maiores sint tempore magni quam dolorem consectetur. Iste, enim, mollitia aliquid maxime vero minima consequuntur quas voluptate? Eum, expedita, sit tempora maxime est vitae minima blanditiis distinctio facilis iste id dolorum dolore nostrum illum modi fugit earum totam recusandae ut accusantium doloremque eligendi mollitia voluptas dignissimos in magni ab alias. Ipsam, quia, aut perferendis vero eaque ratione ea voluptatem ullam veniam impedit nihil possimus inventore maxime vel earum eum veritatis iure eveniet. Sed, laboriosam, magnam, iusto nisi molestiae fugit assumenda quasi quaerat tempora id a modi nesciunt tempore consequuntur aliquid vero reprehenderit in nemo delectus impedit sequi ut dolorem harum. Quam, minima, quis, quod dignissimos autem iusto deleniti quo vitae magni tenetur repellat molestiae id porro aliquid blanditiis quae quaerat aut sint reiciendis eos beatae quisquam veritatis velit quibusdam totam doloribus a suscipit natus voluptas atque vero ipsum non officiis dolores debitis ea vel. Cupiditate, tempora, commodi officiis quis earum nesciunt. Voluptatibus, vitae, necessitatibus numquam at mollitia dignissimos molestias repellendus maxime pariatur tempora officiis voluptates tenetur neque. Reiciendis, ea eius amet harum debitis saepe sit doloribus soluta! Accusamus, dolorem, omnis, voluptas velit maxime recusandae quas saepe a facere tempora sunt aperiam nihil iste quae obcaecati repellat quia eius iusto nostrum perferendis at autem animi veritatis eligendi aliquid cumque nobis laborum dolorum molestias nemo quidem mollitia reprehenderit aliquam! Assumenda possimus explicabo deserunt totam blanditiis illo placeat. Aliquid, laborum, aperiam laudantium deleniti ullam maiores ipsa asperiores fugit labore deserunt porro nam est sunt sit inventore natus accusantium enim ut ducimus iusto veniam dolorum omnis in earum quidem vero adipisci non officia eveniet repellat ad quas explicabo eligendi! Harum, numquam, animi culpa ad ipsum hic incidunt laboriosam natus quos magnam facilis voluptate pariatur mollitia accusamus amet maxime iure! Magni, culpa, ea, rem sit fuga distinctio voluptatem architecto facere repellat laudantium quia tempora ab labore dolorem repellendus sunt adipisci eaque quam accusamus quidem sequi ex consequatur."
    //     },
    //     {
    //         id:2,
    //         title : "Les bénéfices des rappels actifs",
    //         image : "../src/assets/img-final-rappel1.png",
    //         summary:"Delectus, architecto, placeat mollitia earum repudiandae perspiciatis fugit amet eaque veniam expedita molestiae soluta quis minus ipsam cumque deserunt a illum molestias nesciunt temporibus. Rerum, non, fugit, maiores sequi quidem deserunt maxime numquam dolore ratione est voluptatibus atque ad laudantium qui aperiam quaerat omnis similique repellat fugiat id minus aspernatur exercitationem illum animi necessitatibus. Sequi, vel, ut vitae at error ab distinctio ipsa deleniti qui expedita repudiandae ad aut eos autem veritatis delectus voluptatum commodi doloribus debitis perspiciatis dolor necessitatibus.",
    //         content:"Repellat, quo, eos excepturi nobis et fugit illum quam enim atque maiores omnis tempore officia voluptatem aliquid quas nihil odio ipsa. Est, dolores, odio, quos eaque dicta doloribus assumenda ipsum sint dolore soluta eligendi quo praesentium illum quae ab eum aut esse earum obcaecati amet laborum sapiente molestias atque temporibus at! Deserunt, maxime, aut, minus rem explicabo dolorem iusto aliquam dolore doloribus laboriosam nihil accusantium. Ipsa, laboriosam, hic, voluptate, corrupti eaque ut pariatur delectus ducimus exercitationem et illum tenetur fugiat dolorum aut temporibus error dolorem maxime soluta ullam unde dolor nisi saepe modi aspernatur molestias sint doloremque. Voluptate, laudantium, distinctio maxime aliquid pariatur deleniti earum nemo quis animi ipsa recusandae labore quas possimus quam libero. Mollitia, aspernatur, ea, vitae velit placeat commodi blanditiis totam iure sit cupiditate quisquam debitis molestias earum itaque similique facere expedita unde temporibus maxime excepturi autem quo iusto magni eius vel veniam culpa maiores saepe omnis hic magnam sequi voluptas ad dolorem repellendus officiis asperiores consequuntur aut laboriosam cum quos explicabo. Quibusdam, tenetur molestiae at vel impedit quam incidunt sapiente? Dicta, tempore nulla molestias architecto illo laudantium cupiditate recusandae aut quaerat? Minima, blanditiis, debitis laudantium facilis maxime facere delectus numquam tempore commodi recusandae alias quia quos nemo. Deleniti, repellat, sapiente reprehenderit cupiditate beatae molestias voluptate non illo tenetur est quod rerum labore quasi numquam repudiandae neque ratione ea error. Numquam, rem, nisi, illo eum tenetur vero illum incidunt aliquid eos in repellendus expedita iste est amet facere quidem sapiente aliquam officia culpa quod error totam maxime quos doloremque voluptatem esse consequuntur at ex atque excepturi. Beatae, reprehenderit, cupiditate ducimus alias error modi minima laboriosam quidem! Quasi, nostrum, perspiciatis labore nisi aliquid consequatur explicabo sunt harum odio dicta architecto ullam. Delectus asperiores numquam inventore labore aut doloremque dolorum! Obcaecati, voluptates rem id adipisci odit nemo eaque! Blanditiis, aliquid, soluta, esse saepe mollitia reiciendis accusantium tenetur itaque velit quibusdam illum officiis numquam dolores asperiores sapiente architecto possimus! Sed, accusantium quibusdam exercitationem rerum totam. Nulla, quae, eaque dolorem esse sed et molestias nobis explicabo at atque consequatur est eum sequi magni laudantium repudiandae eveniet molestiae consectetur odio quo veritatis officiis aut deserunt cum natus velit omnis ab voluptates fugiat inventore optio aliquam excepturi dolorum vitae soluta reiciendis nam in. Alias, voluptas, hic, at minus enim impedit rem voluptatum provident possimus consequuntur magni ad inventore sed aliquid quae animi repellendus voluptate illum. Inventore mollitia magnam quisquam rem similique doloribus tempore."
    //     }
    // ]
    // const selectedArticle = blogArticlesArray.find((oneArticle) => oneArticle.id === parseInt(id))
    
    
    return (
        <>
            
            {/***** Scroller inspector ****/}
            <div className="home-scroll-inspector"></div>
            
            <main className="container onearticlepage-main">
                
                {/***** Contenu principal *****/}
                <article className="onearticlepage-article">
                
                    <h1>{selectedArticle.title}</h1>
                    <p>Ecrit par {selectedArticle.authorName}</p>
                    <p>Temps de lecture</p>
                    <p className="onearticlepage-article-content">{selectedArticle.paragraphs}</p>
                    <p>Publié le {new Date(selectedArticle.createdAt).toLocaleDateString()}</p>
                    <p>Nombre de commentaire</p>
                    <p>Note</p>
                    
                    {user && !user.userToken && (
                        <>
                            <p>Pour laisser un commentaire et mettre une note connectez-vous</p>
                            <NavLink className="onearticlepage-calltoaction-signin" to="/connexion"> Se connecter </NavLink>
                            <p>Vous n'avez pas de compte ?</p>
                            <NavLink className="onearticlepage-calltoaction-register" to="/inscription"> S'inscrire </NavLink>
                        </>
                    )}
                    
                </article>
                
            </main>
        
        </>
    )
}

export default OneArticlePage