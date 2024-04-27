import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext'



// FONT (TEXTES) : Truculenta
// FONT (TITRES) : Oswald


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer autoClose="1000" theme="dark" />
    </BrowserRouter>
  </React.StrictMode>,
)
