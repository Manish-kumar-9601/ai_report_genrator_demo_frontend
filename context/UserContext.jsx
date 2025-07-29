import { createContext, useState} from "react";
 
 
const UserContext = createContext();
const UserProvider = ({ children }) => {
const [user, setUser] = useState(localStorage.getItem('user'));
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuth'));
const [token, setToken] = useState(localStorage.getItem("jwtToken") || null);

return (
    <UserContext.Provider
        value={{
            user,
            setUser,
            loading,
            setLoading,
            error,
            setError,
            isAuthenticated,
            setIsAuthenticated,
            token,
            setToken
        }}
        >
        {children}
        </UserContext.Provider>

)
}

export { UserContext, UserProvider };