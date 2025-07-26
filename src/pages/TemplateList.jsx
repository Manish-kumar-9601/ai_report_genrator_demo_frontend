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
    <section className="max-w-8xl mx-auto px-4 py-8">
      {loading ? (
        <p>Loading templates...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="list-disc pl-2 flex gap-8 flex-wrap justify-start">
          {templates.map((template) => (
            <div className="mx-auto" key={template.id}>
              <div className="min-w-md py-2 bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <a>
                  <DocViewerComponent file={template.file_data} />
                </a>
                <div className="px-5 pb-5">
                  <h3 className=" text-xl text-gray-900 font-semibold  tracking-tight dark:text-white">
                    {template.title}
                  </h3>
                  <h2 className="font-bold text-white flex gap-3">
                    Created At:
                    <span className=" font-semibold text-gray-900 dark:text-white">
                      {dateFormatter(template.createdAt)}
                    </span>
                  </h2>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center justify-between"></div>

                    <a
                      href="#"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Use
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};
