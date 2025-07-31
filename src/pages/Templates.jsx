import axios from "axios";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
 
const DotSpinner = () => {
  return (
 
<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>
 
  );
};
export const Templates = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [docForm, setDocForm] = useState([]);
  const [uploadToDB, setUploadToDB] = useState(false);
  const [loader, setLoader] = useState(false);
   const {  user, isAuthenticated } = useContext(UserContext);
    console.log(!isAuthenticated);
    if (!isAuthenticated) {
      return   navigate("/login");
    }
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
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    if (!file.name.endsWith(".docx") && !file.name.endsWith(".doc")) {
      setMessage("Please select a .docx or .doc file");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    console.log(user.username, "username in handleSubmit");
    formData.append("templateFile", file); 
    formData.append("username", user.username);
    console.log(formData.get("templateFile"));
    if (uploadToDB) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REPORT_UPLOAD_DOC_TEMPLATE}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      
        navigate("/templateList");
        console.log(response.data);
        setResponse([response.data]);
        setMessage("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REPORT_TEMPLATE}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log(response.data);
        setResponse([response.data]);
        setMessage("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(response);

  return (
    <>
      <div className="file-upload-container bg-gray-100 p-6 rounded-lg shadow-md">
        <h2>Upload DOCX File</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <input
              type="file"
              onChange={handleFileChange}
              className="bg-white border border-gray-300 rounded p-2 w-full"
              accept=".docx, .doc"
              name="templateFile"
            />
          </div>
          <span className="flex  items-center justify-center mt-4 gap-5">
            <button
              className="p-4 rounded-lg bg-blue-400 hover:bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition ease-in-out duration-200 "
              type="submit"
              disabled={loading}
              onClick={() => setUploadToDB(false)}
            >
              {loading && !uploadToDB ?<span><DotSpinner/> Uploading   </span> : "Upload  in Form"}
            </button>

            <button
              className="p-4 rounded-lg bg-indigo-400 hover:bg-indigo-500 font-bold text-white shadow-lg shadow-indigo-200 transition ease-in-out duration-200"
              type="submit"
              disabled={loading}
              onClick={() => setUploadToDB(true)}
            >
 
              {loading  && uploadToDB ? <span><DotSpinner/>uploading...   </span> : "Upload Only"}
            </button>
          </span>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      {response && !uploadToDB && (
        <section className="docFormSection">
          <form
            onSubmit={docFormHandler}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">Document Parameters</h2>
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
    </>
  );
};
