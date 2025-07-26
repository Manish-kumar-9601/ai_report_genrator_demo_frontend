import axios from "axios";
import { useEffect, useState } from "react";
import { DocViewerComponent } from "../components/DocViewerComponent";
// import DocViewer from "react-doc-viewer";
// import DocViewerComponent from "../components/DocViewerComponent";
export const TemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_REPORT_GET_DOC_TEMPLATES
      );
      setTemplates(response.data);
    } catch (err) {
      setError("Failed to fetch templates");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, []);
  console.log("Templates:", templates);
const dateFormatter = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // Optional
    hour12: true, // Use 12-hour format with AM/PM
  };
  return new Date(dateString).toLocaleString(undefined, options);
};


  return (
    <section className="max-w-8xl mx-auto lg:px-10 md:px-5 px-3 py-10 flex justify-center">
      {loading ? (
        <p>Loading templates...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : ( 
        <ul className="list-disc  lg:grid lg:grid-cols-2  md:flex grid p-5 flex-wrap lg:w-full md:w-3xl sm:w-md md:justify-center  gap-10">
          {templates.map((template) => (
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              key={template._id}
            >
              <DocViewerComponent file={template.file_data} />

              <div className="p-4 bg-orange-500 text-white rounded-b-xl">
                <h3 className="text-lg font-semibold truncate">
                  {template.title}
                </h3>
                <p className="text-sm opacity-90">
                  {dateFormatter(template.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};
