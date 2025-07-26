import { Link, Outlet } from "react-router";

// Navbar Component

// Hero Section Component
const HeroSection = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-20 px-4 rounded-lg shadow-lg mx-auto  max-w-7xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Web-based Document Generator
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Create customized documents using Word templates and user input.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={"/templateCreate"}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              + Create New
            </Link>
            <Link
              to={"/templateList"}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Choose Template
            </Link>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
};

// Document Card Component
const DocumentCard = ({ title, date, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover object-top rounded-t-xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/300x192/E5E7EB/4B5563?text=${encodeURIComponent(
            title
          )}`;
        }}
      />
      <div className="p-4 bg-orange-500 text-white rounded-b-xl">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm opacity-90">{date}</p>
      </div>
    </div>
  );
};

// Recent Documents Section
const RecentDocuments = () => {
  const recentDocs = [
    {
      title: "Company-letter",
      date: "10 Mar 2025",
      imageUrl:
        "https://placehold.co/300x192/E5E7EB/4B5563?text=Company-letter",
    },
    {
      title: "Resume",
      date: "15 Mar 2024",
      imageUrl: "https://placehold.co/300x192/E5E7EB/4B5563?text=Resume",
    },
    {
      title: "Bio-Data",
      date: "10 Feb 2024",
      imageUrl: "https://placehold.co/300x192/E5E7EB/4B5563?text=Bio-Data",
    },
    {
      title: "Business Report",
      date: "02 May 2021",
      imageUrl:
        "https://placehold.co/300x192/E5E7EB/4B5563?text=Business+Report",
    },
    {
      title: "Project Report",
      date: "10 Mar 2025",
      imageUrl:
        "https://placehold.co/300x192/E5E7EB/4B5563?text=Project+Report",
    },
    {
      title: "College letter",
      date: "10 Mar 2025",
      imageUrl:
        "https://placehold.co/300x192/E5E7EB/4B5563?text=College+Letter",
    },
    {
      title: "Notice",
      date: "16 Fall 2025",
      imageUrl: "https://placehold.co/300x192/E5E7EB/4B5563?text=Notice",
    },
    {
      title: "Company-letter",
      date: "10 Mar 2025",
      imageUrl:
        "https://placehold.co/300x192/E5E7EB/4B5563?text=Company-letter",
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Recent Documents
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recentDocs.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            date={doc.date}
            imageUrl={doc.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 rounded-t-lg shadow-inner mt-12">
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
          <a href="#" className="hover:text-orange-400 transition duration-300">
            Contact us
          </a>
        </div>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} DocGen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Main App Component
export const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {/* <Navbar /> */}
      <main>
        <HeroSection />
        <RecentDocuments />
      </main>
      <Footer />
    </div>
  );
};
