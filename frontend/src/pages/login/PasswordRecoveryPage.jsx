import { Link } from "react-router-dom"



function PasswordRecovery() {

    return(
        <div>
            <h1>Recupera tu contraseña</h1>
            
            <div>
                <div><Link to="/login">Inicia sesión</Link></div>
                <div><Link to="/register">Registrarse</Link></div>
            </div>
        </div>
        
    )

};

export default PasswordRecovery
