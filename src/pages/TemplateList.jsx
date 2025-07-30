import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DocViewerComponent } from "../components/DocViewerComponent";
import { UserContext } from "../../context/UserContext";

// import DocViewer from "react-doc-viewer";
// import DocViewerComponent from "../components/DocViewerComponent";

// Use Button Component (Primary Action)
const UseButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-full bg-blue-400 hover:bg-blue-500 font-bold text-white shadow-lg  transition ease-in-out duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
      "
    >
      {children}
    </button>
  );
};

// Delete Button Component (Destructive Action)
const DeleteButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
    >
      {children}
    </button>
  );
};

const DocumentToggle = ({ setShowOnlyMine,showOnlyMine }) => {


 

  return (
    <div className="flex items-center gap-3  lg:ml-20 md:ml-10 ml-5" >
      <label htmlFor="docToggle" className="text-sm font-medium text-gray-700">
        {showOnlyMine
          ? "Showing: Only Your Documents"
          : "Showing: All Documents"}
      </label>
      <button
        id="docToggle"
        onClick={()=>setShowOnlyMine(!showOnlyMine)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          showOnlyMine ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            showOnlyMine ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export const TemplateList = () => {
  const { isAuthenticated, user } = useContext(UserContext);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [onChange, setOnChange] = useState(false);
  const [response, setResponse] = useState([]);
  const [popupForm, setPopupForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [docForm, setDocForm] = useState({});
  const username = user?.username || null;
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
// console.log(
//   templates
//     .filter(
//       (i) => showOnlyMine ?( i.uploadedBy ?
//        ( typeof i.uploadedBy === "string" &&
//         i.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) && i.uploadedBy===username ) :true
//     ): (i.uploadedBy?  typeof i.uploadedBy === "string" &&
//         i.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) :true))
//     .map((i) => i.uploadedBy)
// );

  console.log(username, "username in TemplateList");
  const docFormHandler = async (e) => {
    e.preventDefault();
    console.log("docForm", docForm);
    if (!docForm) {
      setMessage("Please fill in the form");
      return;
    }
    const responseData = await axios
      .post(`${import.meta.env.VITE_REPORT_DOC_TEMPLATE}`, {
        docForm: docForm,
        filePath: response[0]?.filePath,
      })
      .then(() => {
        setLoader(true);
        setMessage("Document generated successfully!");
      });
    console.log("responseData", responseData);
  };
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
  const handleUse = async (fileName, file) => {
    console.log(file);
    const arrayBuffer = await file["data"];
    const binaryData = new Uint8Array(arrayBuffer);
    const blob = new Blob([binaryData], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const formData = new FormData();
    formData.append("file", blob, `${fileName}.docx`);
    console.log("Use button clicked!", file["data"]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REPORT_TEMPLATE}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      setResponse([response.data]);
      setMessage("File uploaded successfully!");
      console.log(message);
      setPopupForm(false);
      console.log("pop", popupForm);
    } catch (error) {
      console.error("Error uploading file:", error);
      // setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
      setMessage("File uploaded successfully!");
      console.log(message);
      setPopupForm(true);
    }
  };

  const handleDelete = (template) => {
    console.log("Delete button clicked!");
    axios
      .delete(
        `${import.meta.env.VITE_REPORT_DELETE_DOC_TEMPLATES}/${template.id}`
      )
      .then((response) => {
        console.log("Document deleted successfully:", response.data);
        setOnChange(!onChange); // Trigger re-fetch of templates
        fetchTemplates();
      });
  };

  return (
    <>
      {popupForm && (
        <section className={`${!popupForm ? "hidden" : "block"} px-20 `}>
          <form
            onSubmit={docFormHandler}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <span className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Document Parameters</h2>

              <button
                onClick={() => setPopupForm(false)}
                type="button"
                className="relative border-2 border-black group hover:border-red-500 w-12 h-12 duration-500 overflow-hidden"
              >
                <p className="font-Manrope text-3xl h-full w-full flex items-center justify-center text-black duration-500 relative z-10 group-hover:scale-0">
                  ×
                </p>
                <span className="absolute w-full h-full bg-red-500 rotate-45 group-hover:top-9 duration-500 top-12 left-0"></span>
                <span className="absolute w-full h-full bg-red-500 rotate-45 top-0 group-hover:left-9 duration-500 left-12"></span>
                <span className="absolute w-full h-full bg-red-500 rotate-45 top-0 group-hover:right-9 duration-500 right-12"></span>
                <span className="absolute w-full h-full bg-red-500 rotate-45 group-hover:bottom-9 duration-500 bottom-12 right-0"></span>
              </button>
            </span>
            {response &&
              response[0]?.parameters &&
              response[0].parameters.map((param, index) => (
                <div key={index} className="mb-4 p-4 bg-white shadow rounded">
                  <label className="block text-sm font-medium text-gray-700">
                    {param}
                  </label>
                  <input
                    onChange={(e) =>
                      setDocForm({
                        ...docForm,
                        [param]: e.target.value,
                      })
                    }
                    type="text"
                    name={param}
                    id={param}
                    required
                    placeholder={`Enter ${param}`}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
              >
                Generate Document
              </button>
              {/* {error && <p className="text-red-500">{error}</p>} */}
              {loader && (
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href={import.meta.env.VITE_REPORT_DOWNLOAD_DOC}
                  download
                >
                  download
                </a>
              )}
            </div>
          </form>
        </section>
      )}
      <section
        className={`${
          popupForm ? "hidden" : "block"
        }  max-w-8xl mx-auto lg:px-10 md:px-5 px-3 py-10 flex justify-center`}
      >
        {loading ? (
          <p>Loading templates...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <section className="w-full">
            <div className=" text-gray-600  items-center flex justify-between gpa-10">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="bg-white  flex-1   shadow-md h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DocumentToggle
                setShowOnlyMine={setShowOnlyMine}
                showOnlyMine={showOnlyMine}
              />
            </div>

            <ul
              className={` list-disc  lg:grid lg:grid-cols-2  md:flex grid p-5 flex-wrap lg:w-full md:w-3xl sm:w-md md:justify-center  gap-10`}
            >
              {
             templates.filter((i) =>showOnlyMine ? i.uploadedBy==username:true ).map((template) => (
                  <div
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    key={template.id}
                  >
                    <DocViewerComponent file={template.file_data} />

                    <div className="p-4 bg-orange-500 text-white rounded-b-xl">
                      <span>
                        <h3 className="text-lg font-semibold truncate">
                          {template.title}
                        </h3>
                        <p className="text-sm opacity-90">
                          {dateFormatter(template.createdAt)}
                        </p>
                        {template.uploadedBy && (
                          <p className="text-sm opacity-90">
                            Uploaded by: {template.uploadedBy}
                          </p>
                        )}
                      </span>
                      <span className="flex justify-evenly flex-wrap gap-2 space-x-2 mt-2">
                        <UseButton
                          onClick={() =>
                            handleUse(template.title, template.file_data)
                          }
                        >
                          <svg
                            className="w-5 h-5 inline-block mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 8a9 9 0 110-18 9 9 0 010 18z"
                            ></path>
                          </svg>
                          Use Document
                        </UseButton>
                        {isAuthenticated && template.uploadedBy == username ? (
                          <DeleteButton onClick={() => handleDelete(template)}>
                            <svg
                              className="w-5 h-5 inline-block mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                            Delete Document
                          </DeleteButton>
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
            </ul>
          </section>
        )}
      </section>
    </>
  );
};
