import { createContext, useState, useEffect, useContext} from "react";
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

	const [user, setUser] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect( () => {
		const checkAuth = async() => {
			try {
				const response = await api.get('users-api/me/');
				
				if (response.data) {
					setUser(response.data);
					setIsAuthenticated(true);
				}
			}
			catch (error){
				setUser(null);
				setIsAuthenticated(false);


				if (error.response) {
					console.log('Datos de error de django', error.response.data);
					console.log('status de error', error.status);
				}
				else {
					console.log('Error de conexion con el backend', error.message);
				}
					
			}
			finally {
				setLoading(false);
			}
		};

		checkAuth();

	}, []);

	return (
		<AuthContext.Provider value={{user, isAuthenticated, loading, setUser, setIsAuthenticated}}>
			{children}
		</AuthContext.Provider>
	);


};

export const useAuth = () => useContext(AuthContext)