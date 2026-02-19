import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import api from "../../api/axios"

function LoginPage() {

    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        "email":"",
        "password":"" 
    });

    const [errors, setErrors] = useState({});

    const [showPass, setShowPass] = useState(false);


    useEffect(() => {

        const access = localStorage.getItem("access_token");

        if (access) {
            navigate("/")
        }
    

    },[navigate]


    );


    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors({});

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
        <div className="login-container">
            {(errors.detail || errors.non_field_errors) &&
            <div className="error-container">
                {errors.detail || errors.non_field_errors?.[0]}
            </div>

            }

            <h1>Inicia sesión</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                onChange={handleChange}
                value={loginForm.email} />
                {errors.email && <span className="error-msg">{errors.email[0]}</span>}

                <input 
                type={showPass? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                value={loginForm.password} />
                {errors.password && <span className="error-msg">{errors.password[0]}</span>}  
                <button 
                type="button"
                name="show-hide-button"
                onClick={handleShowHideButton}>{showPass? "Ocultar" : "Mostrar"} contraseña</button>

                <button 
                type="submit"
                >Entrar</button>
            </form>

            <div>
                <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link> </p>
            </div>
        </div>
        
        
    )
}

export default LoginPage