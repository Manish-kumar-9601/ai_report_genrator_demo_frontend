import React from 'react';
const Input = ({formHandler,setLoader,setReportDetails} ) => {
  return (
    <div className="absolute bottom-0 w-full   ">
      <div className="relative max-w-4xl min-w-2xs   mx-auto">
        <form onSubmit={formHandler}  className="relative pb-4 flex flex-col bg-black/10">
        <span className=' bg-white/10 text-white p-4 rounded-t-2xl' > 
        <label >Write Report:</label>
          <textarea className="mt-2 w-full min-h-[52px] max-h-[200px] rounded-xl  px-4 py-3 bg-white/15 text-white placeholder:text-white/70 border-1 outline-none resize-none focus:ring-0 focus:outline-none leading-[1.2]" placeholder="Write report details" id="ai-input"   onChange={(e)=>setReportDetails(e.target.value)}  />
          </span>
          <div className="h-12 bg-white/10 rounded-b-xl ">
            <div className="absolute left-3 bottom-8 flex items-center gap-2 px-10">
              <label className="cursor-pointer rounded-lg p-2 bg-white/5 hover:bg-white/10">
                <input className="hidden" type="file" />
                <svg className="text-white/40 hover:text-white transition-colors" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </label>
              <a href={import.meta.env.VITE_DOWNLOAD_REPORT} className="rounded-full flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer bg-sky-500/15 hover:bg-sky-500/20 border-sky-400 text-sky-500" type="button" download>
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <svg className="text-sky-500" strokeLinejoin="round" strokeLinecap="round" strokeWidth={2} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                    <circle r={10} cy={12} cx={12} />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <span className="text-sm text-sky-500">Download</span>
              </a>
              <a href={import.meta.env.VITE_REPORT_PREVIEW} className="rounded-full flex items-center gap-2 px-1.5 py-1 border h-8 cursor-pointer bg-yellow-500/15 hover:bg-sky-500/20 border-yellow-400 text-yellow-500" type="button"  download>
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="787" height="781" fill="none" viewBox="0 0 787 781">
  <path fill="#FFEA00" d="m777.3 723.767-70.067-70.034c17-25.633 27.134-57.1 27.134-90.933 0-79.633-56.1-146.167-130.967-162.2l-1.1-.2V264.767c0-8.2-2.933-15.7-7.767-21.534l.034.067v-.167c-.634-.766-1.3-1.5-2-2.2l-.267-.3-.9-.9-248-248c-.7-.7-1.4-1.333-2.167-1.966l-.866-.6c-.534-.434-1.1-.867-1.667-1.267l-.833-.6c-.6-.4-1.2-.733-1.8-1.133l-.767-.4a20.182 20.182 0 0 0-2.5-1.234l-1.067-.433-1.7-.6-1.2-.367-1.933-.5-.933-.2c-.934-.2-1.9-.333-2.867-.433H24.833C6.2-17.933-8.867-2.867-9 15.733v679.234c0 18.7 15.133 33.9 33.833 33.966H568.5c33.767 0 65.167-10.133 91.333-27.566l-.6.366L729.3 771.8a33.882 33.882 0 0 0 22.967 8.933c18.766 0 33.966-15.2 33.966-33.966 0-8.867-3.4-16.934-8.966-22.967l.033.033v-.066Zm-110.833-160.9c0 54.166-43.934 98.1-98.1 98.1-54.167 0-98.1-43.934-98.1-98.1 0-54.167 43.933-98.1 98.1-98.1 54.133.066 98.033 43.966 98.1 98.1Zm-313.2-465.2 133.1 133.133h-133.1V97.667Zm-294.334-48h226.434v215.1c0 18.766 15.2 33.966 33.966 33.966h215.1V400.4c-75.933 16.233-132.066 82.767-132.066 162.433 0 36.967 12.066 71.1 32.5 98.667l-.334-.433H58.9l.033-611.4Z"/>
</svg>

                </div>
                <span className="text-sm text-yellow-500">Preview</span>
              </a>
            </div>
            <div className="absolute right-14  bottom-7"onClick={()=>setLoader(true)}   >
              <button onClick={()=>setLoader(true)} className="rounded-lg p-2 hover:bg-white/100 bg-white/40 text-white/80 hover:text-black cursor-pointer transition-colors" type="submit">
                <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} stroke="currentColor" fill="none" viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Input;
