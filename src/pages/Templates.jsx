import axios from 'axios';
import { useState } from 'react';


export const Templates = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [docForm, setDocForm] = useState([])
  const [uploadToDB, setUploadToDB] = useState(false);
  const [loader, setLoader] = useState(false);
  
 
  // const [error, setError] = useState('')
 
  
  const docFormHandler =async (e) => {
    e.preventDefault()
    console.log("docForm", docForm);
    if(!docForm) {
      setMessage('Please fill in the form');
      return;
    }
    const responseData = await axios.post(
      `${import.meta.env.VITE_REPORT_DOC_TEMPLATE}`,
      {'docForm':docForm,filePath:response[0]?.filePath}
    ).then(()=>{
      setLoader(true);
      setMessage('Document generated successfully!');
    })
      console.log("responseData", responseData);
  }
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
      if (e.target.files[0]) {
        setFile(e.target.files[0]);
        setMessage('');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!file) {
        setMessage('Please select a file first');
        return;
      }
      
      if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
        setMessage('Please select a .docx or .doc file');
        return;
      }
    
      setLoading(true); 
    
      const formData = new FormData();
      formData.append('templateFile', file);  // Make sure the field name matches backend's `upload.single("templateFile")`
    console.log(formData.get('templateFile'));
    if(uploadToDB) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REPORT_UPLOAD_DOC_TEMPLATE}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
    
        console.log(response.data);
        setResponse([response.data]);
        setMessage('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file. Please try again.');
      } finally {
        setLoading(false);
      }
    }else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_REPORT_TEMPLATE}`, 
          formData, 
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    
        console.log(response.data);
        setResponse([response.data]);
        setMessage('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file. Please try again.');
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
            <span className='flex   items-center justify-center  gap-5'>
              <button
                type="submit"
                className="upload-button my-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                disabled={loading}
                onClick={() => setUploadToDB(false)}
              >
                {loading ? "Uploading..." : "Upload  in Form"}
              </button>
              <button
                type="submit"
                className="upload-button my-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                disabled={loading}
                onClick={() => setUploadToDB(true)}
              >
                {loading ? "Uploading..." : "Upload Only"}
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