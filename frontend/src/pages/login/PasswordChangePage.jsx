import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "./PasswordChangePage.css";

function PasswordChangePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useAuth();
  
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const [state, setState] = useState("form");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
      new_password: '',
      confirm_new_password: ''
  });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e) => {
      setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleShowPass = () => setShowPass(!showPass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setErrors({ confirm_new_password: ["Las contraseñas no coinciden"] });
      return;
    }

    setDisableButton(true);
    try {
      await api.post('users-api/password-reset-confirm/', {
        uidb64,
        token,
        ...passwordForm
      });
      setState("success");
    } catch (error) {
      setDisableButton(false);
      if (error.response) {
        setErrors(error.response.data);
      } else {
        setErrors({ detail: ["Error de conexión con el servidor"] });
      }
    }
  };

  return (
    <div className="pass-change-container">
      <div className="auth-card">
        {state === "success" ? (
          <div>
            <h1>¡Contraseña actualizada!</h1>
            <p>Ya puedes iniciar sesión con tu nueva clave.</p>
            <Link to="/login" className="submit-btn">Ir al Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 id="change-pass-title">Nueva Contraseña</h1>
            
            {errors.detail && <p className="error-message">{errors.detail}</p>}

            <div className="form-group change-pass">
              <label>Nueva Contraseña</label>
              <div className="password-field-wrapper">
                <input 
                  type={showPass ? "text" : "password"}
                  name="new_password"
                  onChange={handleChange}
                  value={passwordForm.new_password}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirmar Contraseña</label>
              <div className="password-field-wrapper">
                <input 
                    type={showPass ? "text" : "password"}
                    name="confirm_new_password"
                    onChange={handleChange}
                    value={passwordForm.confirm_new_password}
                />
                <button type="button" onClick={handleShowPass} className="toggle-password-btn">
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {errors.confirm_new_password && <p className="error-message">{errors.confirm_new_password[0]}</p>}
            {errors.new_password && <p className="error-message">{errors.new_password[0]}</p>}

            <button type="submit" disabled={disableButton} className="submit-btn" id="change-pass-btn">
              Confirmar cambio
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PasswordChangePage;