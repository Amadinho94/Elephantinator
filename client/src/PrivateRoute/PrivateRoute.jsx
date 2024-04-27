import {useAuth} from "../context/AuthContext"
import {Navigate, Outlet} from "react-router-dom"
import {useEffect, useState} from "react"

const PrivateRoute = ({roles}) => {
    
        
    const {user} = useAuth()

    const isAuthorized = user && roles.includes(user.role)
  
    if (!isAuthorized) {
        return <Navigate to={"*"} replace />
    } 
    
    return <Outlet />
        
}

export default PrivateRoute;