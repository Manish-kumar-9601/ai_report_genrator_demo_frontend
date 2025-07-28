 
import { Link, Outlet } from "react-router";
export const Navbar = () => {
   return (
    <>
     <nav className="bg-white p-4 shadow-md rounded-b-lg">
       <div className="container mx-auto flex justify-between items-center">
         {/* Logo */}
         <Link className="flex items-center space-x-2" to={"/"}>
           <svg
             className="w-8 h-8 text-orange-500"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="2"
               d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
             ></path>
           </svg>
           <span className="text-2xl font-bold text-gray-800">DocGen</span>
         </Link>

         {/* Navigation Links */}
         <div className="hidden md:flex space-x-6">
           <Link
             to="/"
            
             className="text-gray-600 hover:text-orange-500 font-medium"
           >
             Home
           </Link>
           <Link
             to="/About"
             
             className="text-gray-600 hover:text-orange-500 font-medium"
           >
             About
           </Link>
           <Link
             to={'/contactUs'}
             className="text-gray-600 hover:text-orange-500 font-medium"
           >
             Contact us
           </Link>
         </div>

         {/* Mobile Menu Button (Hamburger) */}
         <div className="md:hidden">
           <button className="text-gray-600 focus:outline-none">
             <svg
               className="w-6 h-6"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M4 6h16M4 12h16m-7 6h7"
               ></path>
             </svg>
           </button>
         </div>
       </div>
     </nav>
<Outlet />
</>
   );
 };