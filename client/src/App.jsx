import  {Routes, Route} from 'react-router-dom'
import '../src/sass/style.css'
import PrivateRoute from './PrivateRoute/PrivateRoute'


// COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'

// PAGES 
import Home from './pages/Home'
import Blog from './pages/Blog'
import ContactPage from './pages/ContactPage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import AllTutorialsPage from './pages/AllTutorialsPage'
import OneTutorialPage from './pages/OneTutorialPage'
import NotFoundPage from './pages/NotFoundPage'
import OneArticlePage from './pages/OneArticlePage'

// USER PAGES (ADMIN AND USER)
import WorkSpaceFolders from './pages/user/WorkSpaceFolders'
import WorkSpaceFlashcards from './pages/user/WorkSpaceFlashcards'
import UserAccount from './pages/user/UserAccount'
import UpdatePassword from './pages/user/UpdatePassword'
import UpdateAccount from './pages/user/UpdateAccount'
import UpdateFolder from './pages/user/UpdateFolder'
import CreateFolder from './pages/user/CreateFolder'
import CreateFlashcard from './pages/user/CreateFlashcard'
import UpdateFlashcard from './pages/user/UpdateFlashcard'
import UserDashboard from './pages/user/UserDashboard'
import FolderResults from './pages/user/FolderResults'
import AllResults from './pages/user/AllResults'

// ADMIN PAGES
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsersDashboard from './pages/admin/AdminUsersDashboard'
import AdminCreateUser from './pages/admin/AdminCreateUser'
import AdminArticlesDashboard from './pages/admin/AdminArticlesDashboard'
import AdminUpdateArticle from './pages/admin/AdminUpdateArticle'
import AdminCreateArticle from './pages/admin/AdminCreateArticle'
import AdminContactsDashboard from './pages/admin/AdminContactsDashboard'
import AdminContact from './pages/admin/AdminContact'



    
    
const App = () => {
    
  return (
    <>
     <Header />
     <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/connexion" element={<LogInPage/>} />
           <Route path="/inscription" element={<RegisterPage/>} />
           <Route path="/contact" element={<ContactPage/>} />
           <Route path="/qui-sommes-nous" element={<AboutPage />} />
           <Route path="/tutoriel" element={<AllTutorialsPage />} />
           <Route path="/tutoriel/article/:id" element={<OneTutorialPage />} />
           <Route path="/blog" element={<Blog />} />
           <Route path="/blog/article/:id" element={<OneArticlePage />} />
           <Route path="/*" element={<NotFoundPage />} />
           
           
           {/*<Route path="/" element={<PrivateRoute roles={["admin", "user"]} />}>*/}
              <Route path="user">
                   <Route path="moncompte" element={<UserAccount />} />
                   <Route path="modifiermotdepasse" element={<UpdatePassword />} />
                   <Route path="modifiermoncompte" element={<UpdateAccount />} />
                   <Route path="monespacedetravail/dossier/:id" element={<WorkSpaceFolders />} />
                   <Route path="monespacedetravail/creerdossier" element={<CreateFolder />} />
                   <Route path="monespacedetravail/modifierdossier/:folderId" element={<UpdateFolder />} />
                   <Route path="monespacedetravail/flashcard/:folderId" element={<WorkSpaceFlashcards />} />
                   <Route path="monespacedetravail/creerflashcard/:folderId" element={<CreateFlashcard />} />
                   <Route path="monespacedetravail/modifierflashcard/:flashcardId" element={<UpdateFlashcard />} />
                   <Route path="tableaudebord" element={<UserDashboard />} />
                   <Route path="tableaudebord/historiquedossier/:folderId" element={<FolderResults />} />
                   <Route path="tableaudebord/historiquerevision/:userId" element={<AllResults />} />
               </Route>
           {/*</Route>*/}
           
           
           {/*<Route path="/" element={<PrivateRoute roles={["admin"]} />}>*/}
              <Route path="admin">
                   <Route path="tableaudebord" element={<AdminDashboard />} />
                   <Route path="tableaudebord/gestionnaireutilisateurs" element={<AdminUsersDashboard />} />
                   <Route path="tableaudebord/gestionnaireutilisateurs/creerutilisateur" element={<AdminCreateUser />} />
                   <Route path="tableaudebord/gestionnairearticles" element={<AdminArticlesDashboard />} />
                   <Route path="tableaudebord/gestionnairearticles/modifierarticle/:articleId" element={<AdminUpdateArticle />} />
                   <Route path="tableaudebord/gestionnairearticles/creerarticle" element={<AdminCreateArticle />} />
                   <Route path="tableaudebord/gestionnairecontacts" element={<AdminContactsDashboard />} />
                   <Route path="tableaudebord/gestionnairecontacts/contact/:contactId" element={<AdminContact />} />
               </Route>
           {/*</Route>*/}
           
           
     </Routes>
     <Footer />
    </>
  )
}

export default App
