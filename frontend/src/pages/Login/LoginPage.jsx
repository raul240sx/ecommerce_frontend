import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import api from "../../api/axios"
import './LoginPage.css'

function LoginPage() {

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        "email":"",
        "password":"" 
    });

    const [errors, setErrors] = useState({});

    const [showPass, setShowPass] = useState(false);

    const [disableButton, setDisableButton] = useState(false);


    useEffect(() => {

        const access = localStorage.getItem("access_token");

        if (access) {
            navigate("/")
        }
    

    },[navigate]


    );


      /* MOSTRAR/OCULTAR CONTRASEÑA */
    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors({});

        setDisableButton(true);

        try{
            const response = await api.post("token/", loginForm);

            const {access, refresh} = response.data;
            
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            console.log("Login existoso!!!!", response.data);

            setLoginForm({
                email:"",
                password:""
            })

            navigate("/")
        }
        catch (error){
            console.error(error)

            if (error.response) {
                console.log("Error al iniciar sesion", error.response.data)
                setErrors(error.response.data)
            }

            else {
            console.error("Error de conexión al servidor");
            setErrors({ non_field_errors: ["Error de conexión al servidor"]})
        }

        }

    };
    
    const handleChange = (e) =>{
        setLoginForm({
            ...loginForm,
            [e.target.name]:e.target.value
        })
    };

    const handleShowHideButton = (e) =>{
        if (e.target.name === "show-hide-button") {
            setShowPass(!showPass)
        }
    };

    


    return(
        <div className="register-container">
            <div className="login-form auth-card">
                <h1>Inicia sesión en GuitarZone</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email-input">Correo Electrónico</label>
                        <input
                        id="email-input"
                        type="text"
                        name="email"
                        placeholder="Correo Electrónico"
                        autoComplete="username"
                        onChange={handleChange}
                        value={loginForm.email} />
                        <span className='error-message' aria-live='polite'>
                            {errors.email && errors.email[0]}
                        </span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password-login-input">Contraseña</label>
                        <div className='password-field-wrapper'>
                            <input
                            id='password-login-input'
                            type={ showPass? 'text' : 'password' }
                            name='password' 
                            placeholder='Contraseña'
                            autoComplete='new-password'
                            value={loginForm.password} 
                            onChange={ handleChange }/>

                            <button
                            type='button'
                            className='toggle-password-btn'
                            onClick={ handleShowPass }>
                                { showPass? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                                </svg>) : 
                                (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>) }
                            </button>
                        </div>
                    </div>
                    <span className='error-message' aria-live='polite'>
                        {errors.password && errors.password[0]}
                    </span>
                    <button
                        className='login-btn' 
                        type='submit'
                        disabled={disableButton}>
                        Iniciar Sesión
                    </button>  
                </form>

                <div className='auth-links'>
                    <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link> </p>
                    <p>Olvidaste tu contraseña? <Link to='/password-recovery'>Recuperar contraseña</Link></p>
                    <hr />
                    <p><Link to='/'>Volver al inicio</Link></p>

        
                </div>
            </div>
        </div>
        
        
    )
}

export default LoginPage


