import {NavLink} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Blog = () => {
    
    const [allArticles, setAllArticles] = useState([])
    
    useEffect(() => {
        scrollTo(0,0)
        const fetchData = async () => {
            
            // AVEC TRY AND CATCH
            try {
                const res = await axios.get(`/api/articles/getallarticle`)
                await setAllArticles(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        
        fetchData()
    }, [])
    
    
    return(
        <main className="container blog-main">
            <h1>Articles Elephantinator</h1>
            
            <section className="blog-section"  >
            {allArticles.map ((oneArticle) => (
               <article key={oneArticle._id} className="blog-article">
                   <figure className="blog-article-figure">
                       <img className="img-responsive" src={`${import.meta.env.VITE_API_URL}/articleImage/${oneArticle.articleImage}`} alt={oneArticle.title}/>
                   </figure>
                   <section>
                       <p>Catégorie</p>
                       <p>Temps de lecture</p>
                       <h1>{oneArticle.title}</h1>
                       <summary className="blog-summary">{oneArticle.summary}</summary>
                       <NavLink className="blog-article-navlink" to={`/blog/article/${oneArticle._id}`}> Lire l'article </NavLink>
                       <p>Ecrit par {oneArticle.authorName}</p>
                       <p>Publié le {new Date(oneArticle.createdAt).toLocaleDateString()}</p>
                   </section>
               </article>
            ))}
            </section>
        </main>
        
    )
}

export default Blog