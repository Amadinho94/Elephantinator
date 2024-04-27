import {NavLink} from 'react-router-dom'
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';


const Footer = () => {
  
    
    return (
      
        <footer className="footer-background-flex">
          
          {/******** Container that wraps around the other sections of the footer ********/}
          <section className="footer-cards-flex">
          
          {/******** Social media footer section ***********/}
            <section className="footer-section">
               <h3>A propos de nous</h3>
               <aside className="aside-socialmedia">
                  <Facebook className="facebook"/>
                  <Twitter className="twitter"/>
                  <Instagram className="instagram"/>
                  <Linkedin className="linkedin"/>
               </aside>
               <NavLink className="footer-legal-navlink" to="/qui-sommes-nous">
                    Qui sommes nous ?
               </NavLink>
            </section>
            
          {/******** Contact us footer section *********/}
            <section className="footer-section">
              <h3>Nous contacter</h3>
              <NavLink className="footer-legal-navlink" to="/contact">Formulaire de contact</NavLink>
              <p>01483086683</p>
              <p>elephantinator@contact.com</p>
            </section>
           
          {/******** Legal mentions footer section *******/} 
            <section className="footer-section">
              <h3>Mentions légales</h3>
              <p><NavLink className="footer-legal-navlink" to="/">Mentions légales</NavLink></p>
              <p><NavLink className="footer-legal-navlink" to="/">Politique de confidentialité</NavLink></p>
              <p><NavLink className="footer-legal-navlink" to="/">Politique des cookies</NavLink></p>
              <p><NavLink className="footer-legal-navlink" to="/">Conditions d'utilisation</NavLink></p>
            </section>
            
          {/******* Newsletter footer section ********/}
            <section className="footer-section">
              <h3>Newsletters</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, consectetur.</p>
              <form className="footer-newsletters-form">
                <div className="footer-newsletters-position">
                  <input type="text" name="email" required />
                  <label htmlFor="email"> Votre adresse email </label>
                </div>
                <button type="submit">S'abonner</button>
              </form>
            </section>
            
          </section>
          
          <img src="/assets/logo-elephantinator-V4.svg" alt="logo elephantinator"/>
        
        </footer>
    )
}

export default Footer