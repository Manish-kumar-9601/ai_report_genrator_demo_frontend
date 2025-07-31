import { useContext, useState } from "react";
import z from "zod";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router";

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  // Destructure the setters directly. No need to manage localStorage here.
  const {
    setUser,
    setToken,
    setIsAuthenticated,
    setLoading: setContextLoading,
  } = useContext(UserContext); // If you want to set the global loading state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [localLoading, setLocalLoading] = useState(false); // Use a local loading state for the form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLocalLoading(true); // Start local loading for the form
    // setContextLoading(true); // Uncomment if you want to set a global loading state during login

    try {
      loginSchema.parse({ email, password });

      const res = await axios.post(import.meta.env.VITE_REPORT_LOGIN, {
        email,
        password,
      });
      console.log("Login successful:", res.data);

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + res.data.token;
      const resData = res.data;

      // --- CRITICAL FIXES HERE ---
      // Pass the actual user object to setUser
      setUser({
        department: resData.department,
        email: resData.email,
        id: resData.id,
        roles: resData.roles,
        username: resData.username,
      });

      // Pass the boolean true to setIsAuthenticated
      setIsAuthenticated(true);

      // Pass the token string to setToken
      setToken(resData.accessToken); // Assuming accessToken is the correct key for the JWT token

      setEmail("");
      setPassword("");
      navigate("/");
      console.log("Login state updated successfully!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = {};
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else if (axios.isAxiosError(err) && err.response) {
        // Use axios.isAxiosError for better type narrowing
        if (err.response.status === 401) {
          setErrors({
            api: "Invalid credentials. Please check your email and password.",
          });
        } else {
          setErrors({
            api: `An unexpected error occurred: ${
              err.response.statusText || err.message
            }. Please try again.`,
          });
        }
      } else {
        setErrors({
          api: "Network error or server unavailable. Please try again later.",
        });
      }
      console.error("Login error:", err);
    } finally {
      setLocalLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] font-sans p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="flex justify-center mb-6">
          <img
            src="/bmu AI.png"
            alt="BMU Logo"
            className="md:h-30 md:w-30 lg:w-35 lg:h-35 w-24 h-24 object-contain  "
          />
        </div>
        <h2 className="text-4xl font-extrabold text-center text-[#003366] mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            {/* BMU Orange focus */}
            <input
              type="text"
              id="email"
              className={`mt-1 block w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#FF6600] focus:border-[#FF6600] sm:text-base transition-all duration-200`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={localLoading}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            {/* BMU Orange focus */}
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-[#FF6600] focus:border-[#FF6600] sm:text-base transition-all duration-200`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={localLoading}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {errors.api && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{errors.api}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-[#fdc50b] to-[#f16304] hover:from-[#f7cd14] hover:to-[#ff6302] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6600] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={localLoading}
          >
            {localLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#003366] hover:text-[#FF6600]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
