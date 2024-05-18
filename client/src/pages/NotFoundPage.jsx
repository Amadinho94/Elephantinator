import {useEffect} from 'react'


const NotFoundPage = () => {
    
    
    useEffect(() => {
        
        scrollTo(0,0)
        document.body.style.overflow = ""
        
    }, [])
    
    
    return (
        <main className="container notfoundpage-main">
        
            <h1> Cette page n'existe pas </h1>
            <img src="/assets/logo-notext-elephantinator-V11.svg" alt="logo elephantinator" />
            
        </main>
    )
}

export default NotFoundPage