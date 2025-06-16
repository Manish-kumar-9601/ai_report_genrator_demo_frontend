import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Input from './Input';
// import { socket } from './socket';
import { renderAsync } from 'docx-preview'
export const App = () =>
{
  const viewerRef = useRef(null)
  const [docTitle, setDocTitle] = useState('doc')
  const [reportDetails, setReportDetails] = useState('')
  const [reportPreview, setReportPreview] = useState(null)
  const [getreport, setGetReport] = useState([])
  const [loader, setLoader] = useState(false);
  
  const [change, setChange] = useState(0)
  const [error, setError] = useState('')
  const [docxContent, setDocxContent] = useState(null);
 
  const handleDownloadAndPreview = async () =>
  {
    try
    {
      // Fetch the document from your API
      const response = await fetch('http://localhost:3000/api/v1/report-preview');
      if (!response.ok)
      {
        throw new Error('Failed to fetch document');
      }

      // Get the document as ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();

      // Store the content for potential reuse
      setDocxContent(arrayBuffer);

      // Render the preview
      await renderAsync(arrayBuffer, viewerRef.current);
      setError("");
    } catch (err)
    {
      setError("An error occurred while processing the document");
      console.error(err);
    }
  };

  const formHandler = async (e) =>
  {
    e.preventDefault();
    try
    {
      if (!reportDetails)
      {
        return console.log('all field required');
      }
      setLoader(true)

      const response = await fetch(import.meta.env.VITE_REPORT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docTitle, reportDetails
        })
      }).then((res) =>
      {
        console.log(res);
        if (res.status === 200)
        {
          setGetReport(res?.result)
          handleDownloadAndPreview()
          setLoader(false)
        }
        // setTimeout(()=>{
        //   link.click()
        // },1000)
      })

      console.log(response);
    } catch (error)
    {
      console.log(error);
    }
  }
 
   


  return (
    <>
      {
        loader ? <div className="loader absolute right-[50%] left-[50%] top-[40%] " >
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
          : <>
            {
              docxContent ? 
              
              // <div ref={viewerRef} className='transition'
              //   style={{

              //     padding: "8px",
              //     height: "80vh",
              //     overflow: "scroll"
              //   }}
              // >
              // </div>
              <></>
               : <>
              </>
            }
          </>
      }
      <Input formHandler={formHandler} setLoader={setLoader} setReportDetails={setReportDetails}     />

      {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={formHandler} >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doc title">
              doc title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="doc title" onChange={(e) => setDocTitle(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="report_topic">
              Report Topic
            </label>
            <textarea className="shadow appearance-none border   rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="report topic" onChange={(e) => setReportDetails(e.target.value)} />
           
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              run
            </button>
            <a onClick={()=>setLoader(false)} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href={import.meta.env.VITE_DOWNLOAD_REPORT}  download>
              download
            </a>
          </div>
        </form> */}


    </>
  )
}
