import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Input from './Input';
import { io } from 'socket.io-client';
import { socket } from './socket';

export const App = () =>
{
  const viewRef=useRef(null)
  const [docTitle, setDocTitle] = useState('doc')
  const [reportDetails, setReportDetails] = useState('')
  const [getreport,setGetReport]=useState([])
  const [loader,setLoader]=useState(false);
  const [isConnected,setIsConnected]=useState(socket.connected)
  const [change,setChange]=useState(0)
  // console.log(docTitle, reportDetails);
  // console.log(import.meta.env.VITE_REPORT);
  // console.log(import.meta.env.VITE_DOWNLOAD_REPORT);
  const link=document.createElement('a')
  link.href=import.meta.env.VITE_DOWNLOAD_REPORT
  document.body.append(link)
  link.setAttribute('download',`${docTitle}.docx`)
  const formHandler = async (e) =>
  {
    e.preventDefault();
    try {
      if(!docTitle || !reportDetails){
       return console.log('all field required');
      }
      socket.connect()
      setLoader(true)

      const response=await fetch(import.meta.env.VITE_REPORT,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docTitle,reportDetails
        })
      }).then((res)=>{
        console.log(res);
        if(res.status===200){
          // setGetReport(res?.result)
        }
        // setTimeout(()=>{
        //   link.click()
        // },1000)
      })
      
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
//  const timekey= set(()=>{
//   count=1
//     console.groupEnd(count+=1)
//   }, 3000);
    useEffect(()=>{
      function onConnect() {
        setIsConnected(true);
      }
  
      function onDisconnect() {
        setIsConnected(false);
      }
  
      function reportEvent(value) {
        setGetReport(previous => [...previous, value]);
        console.log("resport ",getreport);
      }
  
      socket.on('connect', onConnect);
      socket.on('result', (result)=>{
        console.log("result",result);
        if(result !==null || result !==undefined){
setLoader(false)
setGetReport(result)
        }
        // clearInterval(timekey)
      });
      socket.on('disconnect', onDisconnect);
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('foo', reportEvent);
      };
    },[loader,change])

    useEffect(() => {
      // If you prefer to use the Iframe implementation, you can replace this line with: WebViewer.Iframe(...)
      WebViewer.WebComponent(
        {
          path: '/webviewer/lib',
          initialDoc: '/files/PDFTRON_about.pdf',
          licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
        },
        viewer.current,
      ).then((instance) => {
        const { documentViewer, annotationManager, Annotations } = instance.Core;
  
        documentViewer.addEventListener('documentLoaded', () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            // values are in page coordinates with (0, 0) in the top left
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser()
          });
  
          annotationManager.addAnnotation(rectangleAnnot);
          // need to draw the annotation otherwise it won't show up until the page is refreshed
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      });
    }, []);
  return (
    <>
    {/* <textarea className='w-full  p-5   ' value={getreport}> </textarea> */}
     {
      loader ? <div className="loader absolute right-[50%] left-[50%] top-[40%] " >
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
  </div>
  : <div ref={viewRef}>

  </div>
     }
<Input formHandler={formHandler} setLoader={setLoader} setReportDetails={setReportDetails} />
       
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
