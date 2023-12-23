import React, { useState } from 'react'
import DynamicForm from '../DynamicForm/DynamicForm'
import Loader from '../Loader/Loader';

function PreviewPage({ jsonData }) {
    let { data, template } = jsonData;

    const [pdfUrl, setPdfUrl] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState(undefined);

    const buildPdf = async () => {
        setLoading(true);
        data = inputData;
        console.log(inputData);
        const req = await fetch("/api/v1/build", {
            method: "POST",
            body: JSON.stringify({ data, template })
        });

        if (req.status == 200) {
            const res = await req.json();
            setPdfUrl(res.blob);
            setLoading(false);
        }
    }

    return (
        <div style={{ height: '93vh' }} className='overflow-y-hidden flex'>
            <div className='flex-1 overflow-y-auto'>
                <DynamicForm jsonData={data} onChange={setInputData} />
            </div>
            {pdfUrl === undefined && !loading ? '' : pdfUrl && !loading ?
                <div className="flex-1">
                    <iframe src={pdfUrl} height="100%" width="100%" />
                </div> : <div className='flex-1 relative'>
                    <Loader />
                </div>}
            <div class="fixed bottom-8 right-8">
                <button class={`${pdfUrl ? 'bg-blue-900' : 'bg-gray-600'} hover:bg-blue-700 text-white rounded-full p-4 focus:outline-none transition duration-300 ease-in-out shadow-lg`} onClick={buildPdf}>
                    {!pdfUrl ? 
                    <svg xmlns="http://www.w3.org/2000/svg" height="36" width="38" viewBox="0 0 576 512" fill="white">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3" />
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" height="36" width="38" viewBox="0 0 512 512" fill='white'>
                        <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                    </svg>}
                </button>
            </div>
        </div>
    )
}

export default PreviewPage