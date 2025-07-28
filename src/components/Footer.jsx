import { Link, Outlet } from "react-router";

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-800 text-white py-10 rounded-t-lg shadow-inner mt-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0 mb-6">
          <a href="#" className="hover:text-orange-400 transition duration-300">
            About
          </a>
          <a href="#" className="hover:text-orange-400 transition duration-300">
            Terms and Conditions
          </a>
          <a href="#" className="hover:text-orange-400 transition duration-300">
            Privacy Policy
          </a>
          <Link to={'/contactUs'} className="hover:text-orange-400 transition duration-300">
            Contact us
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          &copy; 2025 DocGen. All rights reserved.
        </p>
      </div>
      <Outlet />
    </footer>
  );
};
