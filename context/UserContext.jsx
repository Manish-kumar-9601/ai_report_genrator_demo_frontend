import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// Initial state for the context to ensure consistency
const initialUserState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  token: null,
};

const UserContext = createContext(initialUserState);

const UserProvider = ({ children }) => {
  // Initialize state from localStorage, parsing JSON where necessary
  const [user, setUserState] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState(() => {
    return localStorage.getItem("isAuth") === "true"; // Ensure boolean conversion
  });
  const [token, setTokenState] = useState(
    localStorage.getItem("jwtToken") || null
  );

  // --- Effects for localStorage Synchronization ---

  // Effect to update localStorage when 'user' changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }
  }, [user]);

  // Effect to update localStorage when 'isAuthenticated' changes
  useEffect(() => {
    try {
      localStorage.setItem("isAuth", isAuthenticated ? "true" : "false");
    } catch (e) {
      console.error("Failed to save isAuthenticated to localStorage:", e);
    }
  }, [isAuthenticated]);

  // Effect to update localStorage when 'token' changes
  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("jwtToken", token);
      } else {
        localStorage.removeItem("jwtToken");
      }
    } catch (e) {
      console.error("Failed to save token to localStorage:", e);
    }
  }, [token]);

  // --- Memoized Setters for Stability ---

  // Custom setter for user to handle localStorage updates
  const setUser = useCallback((newUser) => {
    setUserState(newUser);
    // localStorage updates are handled by the useEffect for 'user'
  }, []);

  // Custom setter for isAuthenticated to handle localStorage updates
  const setIsAuthenticated = useCallback((newAuthStatus) => {
    setIsAuthenticatedState(newAuthStatus);
    // localStorage updates are handled by the useEffect for 'isAuthenticated'
  }, []);

  // Custom setter for token to handle localStorage updates
  const setToken = useCallback((newToken) => {
    setTokenState(newToken);
    // localStorage updates are handled by the useEffect for 'token'
  }, []);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
      loading,
      setLoading,
      error,
      setError,
      isAuthenticated,
      setIsAuthenticated,
      token,
      setToken,
    };
  }, [
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    isAuthenticated,
    setIsAuthenticated,
    token,
    setToken,
  ]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
