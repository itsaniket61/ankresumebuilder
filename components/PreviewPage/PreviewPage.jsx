import React, { useState } from 'react'
import DynamicForm from '../DynamicForm/DynamicForm'
import Loader from '../Loader/Loader';

function PreviewPage({ jsonData }) {
    let { data, template } = jsonData;

    const [pdfUrl, setPdfUrl] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const buildPdf = async (inputData) => {
        setLoading(true);
        data = inputData;
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
                <DynamicForm jsonData={data} submitForm={buildPdf} />
            </div>
            {pdfUrl === undefined && !loading ? '' : pdfUrl && !loading ?
                <div className="flex-1">
                    <iframe src={pdfUrl} height="100%" width="100%" />
                </div> : <div className='flex-1 relative'>
                    <Loader />
                </div>}
        </div>
    )
}

export default PreviewPage