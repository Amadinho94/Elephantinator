/*
    Fonction qui retourne un objet avec une clé "authorization" 
    ayant comme valeur le token au format "Bearer"
*/
export const token = () => {
    
    const tokenFromLS = JSON.parse(localStorage.getItem("userToken"))
    
    if (tokenFromLS) {
        
        return {
            Authorization : `Bearer ${tokenFromLS}`
        }
        
    } else {
        
        return {}
    }
}