import {NavLink, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useAuth} from '../context/AuthContext'


const Header = () => {
    
    /* Using data from the logged-in user stored in a variable of the context
    and the logout function of the context */
    const {user, logout} = useAuth()
    
    /* The state that store
    the class that will change the shape of the burger menu button */
    const [burgerLineAnimation, setBurgerLineAnimation] = useState("")
    
    const navigate = useNavigate()
    
    
    const [borderBottom, setBorderBottom] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL
    
    
    useEffect(() => {
        
        // Scroll reset to 0 on page load
        scrollTo(0,0)
        
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('scroll', closeDropDownOnScroll)
        document.body.addEventListener('click', closeDropDown)
        
        
        // Cleanup function
        return () => {
            
          window.removeEventListener('scroll', handleScroll)
          window.removeEventListener('scroll', closeDropDownOnScroll)
          document.body.removeEventListener('click', closeDropDown)
          
        };
        
    }, [])
    
    
    // Function that open and close the burger menu
    const toggleMenu = () => {
        
        setShowMenu(!showMenu)
        
        if (showMenu) {
            
            document.body.style.overflow = ""
            setBurgerLineAnimation("")
            
        } else {
            
            document.body.style.overflow = "hidden"
            setBurgerLineAnimation("burger-line-crossed")
            
        }
    }
    
    
    // Function that open and close the logged user drop down menu
    const toggleDropDown = () => {
        
        setDropDownMenu(!dropDownMenu)
    }
    
    
    // Function to close the drop down menu
    const closeDropDown = (e) => {
        
        if (!e.target.closest(".header-loggeduser")) {
            
            setDropDownMenu(false)
            
        }
    }
    
    
    // Function to close the drop down menu after a scroll event
    const closeDropDownOnScroll = () => {
        
        setDropDownMenu(false)
    }
    
    
    // Function to make appear a line on the bottom of that component
    const handleScroll = () => {
        
        const scroll = window.scrollY
        
        if (scroll > 100) {
            
            setBorderBottom("header-border-bottom")
            
        } else {
            
            setBorderBottom("")   
        }
    }
    
    
    // Function that call the logout function
    const handleLogout = () => {
        
        const confirmModal = window.confirm("Voulez-vous vraiment vous déconnecter ?")
        
        if (confirmModal) {
            
            logout()
        
        }
    }
    
    
    return (
        
       <header className={`header-background ${borderBottom}`}>
        
        {/************* Conteneur de la navbar et du logo ***********/}
         <div className="header-flex">
            
            
            {/* Redirection au click sur le logo */}
            <figure onClick={() => {
            
                if (user && user.userToken) {
                
                   user.role === "admin" ? navigate("/admin/tableaudebord") : navigate("/user/tableaudebord")
                 
                } else {
                
                   navigate("/")
                 }
                 }}>
                 
                <img className="header-logo-desktop" src="/assets/logo-elephantinator-V4.svg" alt="logo elephantinator"/>
           
           </figure>
           
           
           {/********* Bouton Burger menu mobile et tablette ********/}
           <button className={`burger-menu-button ${burgerLineAnimation}`} onClick={toggleMenu}>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
                <div className="burger-menu-line"></div>
            </button>
                 
            
            {/************** Navbar desktop ***************/}
           <nav className="header-navbar-flex">
                {user && user.userToken ? (
                    <>
                        {user.role === "admin" ? (
                            <>
                                <NavLink className="header-navlink" to="/admin/tableaudebord"> Tableau de bord Admin</NavLink>
                                <NavLink className="header-navlink" to="/user/tableaudebord"> Tableau de bord User </NavLink>
                                <NavLink className="header-navlink" to={`/user/monespacedetravail/dossier/${user.id}`}> Workspace </NavLink>
                                <NavLink className="header-navlink" to="/blog"> Blog </NavLink>
                                <NavLink className="header-loggeduser" to="#" onClick={toggleDropDown}>
                                    <div className="header-loggeduser-ppusername">
                                        <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} /> {user.username}
                                    </div>
                                </NavLink>
                            </>
                        )
                            :
                        (
                            <>
                                <NavLink className="header-navlink" to="/user/tableaudebord"> Tableau de bord </NavLink>
                                <NavLink className="header-navlink" to={`/user/monespacedetravail/dossier/${user.id}`}> Workspace </NavLink>
                                <NavLink className="header-navlink" to="/blog"> Blog </NavLink>
                                <NavLink className="header-navlink" to="/contact"> Nous contacter </NavLink>
                                <NavLink className="header-loggeduser" to="#" onClick={toggleDropDown}>
                                    <div className="header-loggeduser-ppusername">
                                        <img className="img-responsive" src={`${API_URL}/profilPicture/${user.profilPicture}`} /> {user.username}
                                    </div>
                                </NavLink>
                            </>
                        )}
                    </>
                )
                    : 
                (
                    <>
                        <NavLink className="header-navlink" to="/"> Accueil </NavLink>
                        <NavLink className="header-navlink" to="/tutoriel"> Comment ça marche ? </NavLink>
                        <NavLink className="header-navlink" to="/blog"> Blog </NavLink>
                        <NavLink className="header-navlink" to="/contact"> Nous contacter </NavLink>
                        {/*<NavLink className="header-navlink" to="/inscription"> S'inscrire </NavLink>*/}
                        <NavLink className="header-navlink-login" to="/connexion"> Se connecter </NavLink>
                    </>
                )}
                
                 
           </nav>
           
           
          </div>
          
          
          {/*************** Menu déroulant *****************/}
          <ul className={!dropDownMenu ? "display-none" : "dropdown-menu-loggeduser"}>
                <li><NavLink onClick={closeDropDown} className="header-navlink" to="/user/moncompte" > Mon compte </NavLink></li>
                <li><NavLink onClick={() => handleLogout()} className="header-navlink-login" to="#"  > Se déconnecter </NavLink></li>
          </ul>
          
          
          {/********* Burger menu mobile et tablette ********/}
          <nav className={showMenu ? "burger-menu-display" : "display-none"}>
                
                {user && user.userToken ? (
                    <>
                        {user.role === "admin" ? (
                            <>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/admin/tableaudebord"> Tableau de bord Admin</NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/user/tableaudebord"> Tableau de bord User </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to={`/user/monespacedetravail/dossier/${user.id}`}> Workspace </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/blog"> Blog </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/user/moncompte" > Mon compte </NavLink>
                                <NavLink className="burger-navlink" onClick={() => {handleLogout(); toggleMenu()}} to="#"  > Se déconnecter </NavLink>
                            </>
                        )
                            :
                        (
                            <>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/user/tableaudebord"> Tableau de bord </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to={`/user/monespacedetravail/dossier/${user.id}`}> Workspace </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/blog"> Blog </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/contact"> Nous contacter </NavLink>
                                <NavLink onClick={toggleMenu} className="burger-navlink" to="/user/moncompte" > Mon compte </NavLink>
                                <NavLink className="burger-navlink" onClick={() => {handleLogout(); toggleMenu()}} to="#"  > Se déconnecter </NavLink>
                            </>
                        )}
                    </>
                )
                    : 
                (
                    <>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/"> Accueil </NavLink>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/tutoriel"> Comment ça marche ? </NavLink>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/blog"> Blog </NavLink>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/contact"> Nous contacter </NavLink>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/inscription"> S'inscrire </NavLink>
                        <NavLink onClick={toggleMenu} className="burger-navlink" to="/connexion"> Se connecter </NavLink>
                    </>
                )}
            </nav>
            
            
       </header>
    )
}

export default Header