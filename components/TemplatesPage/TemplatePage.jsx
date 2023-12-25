'use client'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import TemplateCard from './TemplateCard';

function TemplatePage({ onSelect,onSelectAI }) {

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(-1);


    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/v1/templates');
                const data = await response.json();
                setTemplates(data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);


    return (
        <div className='container mx-auto flex flex-col h-screen'>
            <h2 className="text-white text-3xl text-center font-bold">Templates</h2>
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
                    {templates.length > 0 ? templates.map((template, idx) => (
                        <div onClick={() => setSelectedTemplate(idx)} key={idx}>
                            <TemplateCard template={template} selected={idx === selectedTemplate} />
                        </div>
                    )) : <Loader />}
                </div>
            </div>
            {selectedTemplate !== -1 && (
                <div className="bg-black w-full fixed bottom-0">
                    <button
                    onClick={() => {
                        onSelect(templates[selectedTemplate]);
                    }}
                    className="hover:bg-gray-900 bg-gray-950 p-3 rounded-3xl my-4 mx-auto text-gray-50 border hover:border-blue-300 w-36 font-bold"
                >
                    Next
                </button>
                <button
                    onClick={() => {
                        onSelectAI(templates[selectedTemplate]);
                    }}
                    className="mx-4 hover:bg-gray-900 bg-gray-950 p-3 rounded-3xl my-4 mx-auto text-gray-50 border hover:border-blue-300 w-36 font-bold"
                >
                    Build with AI
                </button>
                </div>
            )}
        </div>

    )
}

export default TemplatePage