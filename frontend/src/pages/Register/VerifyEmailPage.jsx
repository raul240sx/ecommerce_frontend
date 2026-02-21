import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link} from "react-router-dom"


import api from "../../api/axios"


function VerifyEmailPage() {

    const [state, setState] = useState("loading")
    const [errors, setErrors] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const [searchParams] = useSearchParams();

    const uidb64 = searchParams.get("uidb64");
    const token = searchParams.get("token");


    const hasRequested = useRef(false)

    useEffect(() => {
        if (hasRequested.current) return;

        const verifyParams = async () => {
            hasRequested.current = true;

            if (!uidb64 || !token) {
                setState("error")
                setErrors({"detail":"Parámetros faltantes (uidb64 y/o token)"});
                return;
            };

            try{
                const response = await api.post("users-api/email-verification/", {"uidb64":uidb64, "token":token});
                console.log("Respuesta del servidor:", response.data);
                setSuccessMsg(response.data.message)
                setState("success")
            }
        

            catch (error) {
                setState("error")

                if (error.response) {
                    setErrors(error.response.data);
                    console.error("Error al verificar:", error.response.data);
                }
                
                else {
                    setErrors({non_field_errors:["Error al conectar con el servidor:"]})
                    console.error("Error al conectar con el servidor:");
                }
            }
        }
        verifyParams();



    }, [uidb64, token])


    return(
        <div className="verify-container">
            {(state === "loading") && (<div className="verify-msg"><h2>Verificando tu cuenta</h2></div>)}

            {state === "error" && (<div className="verify-msg">
                <h2>{errors.detail || errors.non_field_errors?.[0] || "Algo salió mal, intenta de nuevo."}</h2>
                </div>)}

            {(state === "success") && (<div className="verify-msg">
                <h1>{successMsg}</h1>
                <h2>Ya puedes realizar compras en nuestra web</h2>
                <Link to="/login" className="login-button">Ingresa a tu cuenta</Link>
                
                </div>)}
            
        </div>
    )
}


export default VerifyEmailPage