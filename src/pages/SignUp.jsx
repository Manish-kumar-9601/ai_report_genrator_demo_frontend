import axios from "axios";
import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { UserContext } from "../../context/UserContext";

// To make this component runnable, we'll create a simple App wrapper.
// In a real application, you would import and use SignupPage directly.
export default function App() {
  return <SignupPage />;
}

export const SignupPage = () => {
  const { setUser, setToken, setIsAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Zod schema for validation
  const signupSchema = z
    .object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(50, "Username cannot exceed 50 characters"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character"
        ),
        
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"], // This path will associate the error with the confirmPassword field
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific field error as the user types
    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSubmissionMessage("");

    try {
      // This will throw an error if validation fails
      signupSchema.parse(formData);

      // If we get here, the form data is valid
      console.log("Form data is valid:", formData);
      axios
        .post(import.meta.env.VITE_REPORT_SIGNUP, {
          username: formData.username,
          email: formData.email,
          password: formData.confirmPassword,
        })
        .then((response) => {
          console.log("Sign up successful:", response.data)
           setUser(
             localStorage.setItem(
               "user",
               JSON.stringify({
                 department: response.data.department,
                 email: response.data.email,
                 id: response.data.id,
                 roles: response.data.roles,
                 username: response.data.username,
               })
             )
           );

           setIsAuthenticated(localStorage.setItem("isAuth", true));
           setToken(localStorage.setItem("jwtToken", response.data.accessToken));
          navigate("/"); // Redirect to login page after successful sign up
        })
        
        .catch((error) => {
          console.error("Error during sign up:", error);
          setSubmissionMessage("An error occurred during sign up.");
        });
      setSubmissionMessage("Sign up successful! Welcome.");

      // Clear form after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // This is where the error was. Zod errors have an `issues` array, not `errors`.
        const newErrors = {};
        error.issues.forEach((err) => {
          const field = err.path[0];
          // Append messages if multiple errors exist for one field
          if (newErrors[field]) {
            newErrors[field] += `\n${err.message}`;
          } else {
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
        setSubmissionMessage("Please correct the errors in the form.");
      } else {
        // Handle unexpected errors
        setSubmissionMessage("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="bg-[#F5F5F5] font-sans">
      {" "}
      {/* Light gray background consistent with login */}
      <section className="container mx-auto flex items-center justify-center min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img
              src="/bmu AI.png"
              alt="BMU Logo"
              className="md:h-30 md:w-30 lg:w-35 lg:h-35 w-24 h-24 object-contain  "
            />
          </div>
          <h2 className="text-4xl font-bold text-[#003366] mb-8 text-center">
            {" "}
            {/* BMU Blue heading */}
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {[
              {
                name: "username",
                type: "text",
                placeholder: "e.g.,Nevil Modi",
                autoComplete: "username",
              },
              {
                name: "email",
                type: "email",
                placeholder: "you@example.com",
                autoComplete: "email",
              },
              {
                name: "password",
                type: "password",
                placeholder: "••••••••",
                autoComplete: "new-password",
              },
              {
                name: "confirmPassword",
                type: "password",
                placeholder: "••••••••",
                autoComplete: "new-password",
              },
            ].map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                >
                  {field.name.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  autoComplete={field.autoComplete}
                  className={`shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors[field.name]
                      ? "border-red-500 ring-red-500"
                      : "border-gray-300 focus:border-[#FF6600] focus:ring-[#FF6600]" /* BMU Orange focus */
                  }`}
                  placeholder={field.placeholder}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs italic mt-2 whitespace-pre-line">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#003366] text-white font-bold py-3 px-4 rounded-full hover:bg-[#FF6600] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FF6600] focus:ring-opacity-50" /* BMU Blue button, BMU Orange hover/focus */
            >
              Sign Up
            </button>

            {submissionMessage && (
              <p
                className={`text-center mt-4 text-sm font-medium ${
                  submissionMessage.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submissionMessage}
              </p>
            )}
          </form>
          <p className="mt-8 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-[#003366] hover:text-[#FF6600]"
            >
              Login here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};
