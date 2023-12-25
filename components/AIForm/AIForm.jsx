import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import PreviewPage from '../PreviewPage/PreviewPage';
import TemplateCard from '../TemplatesPage/TemplateCard';
import { useRouter } from 'next/navigation';

function AIForm({ template }) {
    const router = useRouter();
    const [inputs, setInputs] = useState({ jobRole: "", description: "" });
    const [generatedData, setGeneratedData] = useState(undefined);
    const [loading, setLoading] = useState(false);


    const generateData = async () => {
        try {
            setLoading(true);
            const {jobRole,description}=inputs;
            const req = await fetch(`/api/v1/generatedata`,{
                method:'POST',
                body:JSON.stringify({jobRole,description,template:template.name})
            });
            const res = await req.json();
            if (req.status == 200) {
                setLoading(false);
                const content = JSON.stringify({templateName:template.name,jsonData:res});
                const fileName = Date.now().toString()+'.buildifyX';
                const reqCheckIn = await fetch('/api/v1/checkin',{method:'POST',body:JSON.stringify({content,fileName})});
                if(reqCheckIn.status==201){
                    router.push(`/buildifyX/builder?name=${fileName}`);
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className='text-white text-center text-4xl mb-2 font-bold'>{template.name}</h1>
            {!loading && !generatedData ? 
            <div className="flex mt-4">
                <div className="flex-grow w-full">
                    <div className="mx-auto w-min">
                        <TemplateCard template={template} /><br />
                    </div>
                    <input onChange={(e) => setInputs({ jobRole: e.target.value, description: inputs.description })} className='my-2 border border-blue-300 rounded-lg w-full text-2xl p-2 font-bold text-gray-400 bg-gray-900' placeholder='Enter Job Role here.....'></input>
                    <textarea onChange={(e) => setInputs({ jobRole: inputs.jobRole, description: e.target.value })} className='my-2 border border-blue-300 rounded-lg w-full text-2xl p-2 font-bold text-gray-400 bg-gray-900' placeholder='Enter details here.....'></textarea>
                    {<button onClick={generateData}
                        className="bg-gray-900 p-3 rounded-xl text-gray-50 border border-blue-300 w-36 font-bold">
                        Generate
                    </button>}
                </div>
            </div> : generatedData ?
                <PreviewPage jsonData={{ data: generatedData, template: template.name }} />
                : <Loader />}
        </div>
    )
}

export default AIForm