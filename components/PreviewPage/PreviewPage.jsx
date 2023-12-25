import React, { useState, useEffect } from 'react';
import DynamicForm from '../DynamicForm/DynamicForm';
import Loader from '../Loader/Loader';
import Link from 'next/link';

function PreviewPage({ jsonData, onDataChange}) {
let { data, template } = jsonData;
    
    const [pdfUrl, setPdfUrl] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState(undefined);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

    const changeIndex = (i) => {
        setSelectedTabIndex(i);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 780);
    };

    useEffect(() => {
        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures the effect runs only on mount and unmount

    const components = [
        <DynamicForm jsonData={data} onChange={(d)=>{
            setInputData(d);
            onDataChange(d);
        }} key={0} />,
        pdfUrl === undefined && !loading ? (
            ''
        ) : pdfUrl && !loading ? (
            <iframe src={pdfUrl} height="100%" width="100%" key={1} />
        ) : (
                <Loader />
            
        ),
    ];

    const buildPdf = async () => {
        setLoading(true);
        data = inputData;
        const req = await fetch('/api/v1/build', {
            method: 'POST',
            body: JSON.stringify({ data, template }),
        });

        if (req.status === 200) {
            const res = await req.json();
            setPdfUrl(res.blob);
            setLoading(false);
        }
    };

    return (
        isMobile ? (
            <div className="flex h-screen">
                <div className="flex flex-col text-white p-4">
                    <div className="tab">
                        <button
                            className={`my-1 bg-blue-700 text-white rounded-full p-2 md:p-4 focus:outline-none transition duration-300 ease-in-out shadow-lg`}
                            onClick={() => changeIndex(0)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512" fill="white">
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                            </svg>
                        </button>
                        {/* <p className="font-semibold text-white text-center">Edit</p> */}
                    </div>
                    <div className="tab">
                        <button
                            className={`my-1 bg-blue-700 text-white rounded-full p-2 md:p-4 focus:outline-none transition duration-300 ease-in-out shadow-lg`}
                            onClick={() => { buildPdf(); changeIndex(1); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512" fill="white">
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3" />
                            </svg>
                        </button>
                        {/* <p className="font-semibold text-white text-center">Preview</p> */}
                    </div>
                    {pdfUrl ? <div className="tab">
                        <Link
                            className={`inline-block my-1 bg-blue-700 text-white rounded-full p-2 md:p-4 focus:outline-none transition duration-300 ease-in-out shadow-lg`}
                            href={pdfUrl}
                            target='_blank'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512" fill="white">
                            <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/>
                            </svg>
                        </Link>
                        {/* <p className="font-semibold text-white text-center">Preview</p> */}
                    </div> : null}
                </div>
                <div className="flex-1 overflow-y-auto">{components[selectedTabIndex]}</div>
            </div>
        ) : (
            <>
                <div className="flex h-screen">
                    <div className="flex-1 h-screen overflow-y-auto">
                        {components[0]}
                    </div>
                    <div className="flex-1 relative">
                        {components[1]}
                    </div>

                </div>
                <button
                    className={`fixed bottom-1 right-1 my-1 bg-blue-700 text-white rounded-full p-2 md:p-4 focus:outline-none transition duration-300 ease-in-out shadow-lg`}
                    onClick={() => { buildPdf() }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512" fill="white">
                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3" />
                    </svg>
                </button>
            </>
        )
    );
}

export default PreviewPage;
