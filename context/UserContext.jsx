import { createContext, useState} from "react";
 

const UserContext = createContext(null);
const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
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