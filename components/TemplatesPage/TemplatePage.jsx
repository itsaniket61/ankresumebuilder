'use client'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import TemplateCard from './TemplateCard';

function TemplatePage({ onSelect }) {

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
        <div className='container mx-auto'>
            <h2 className="text-white text-3xl text-center font-bold">Templates</h2>
            <div className="flex" style={{ height: '87vh' }}>
                <div className="flex-1">
                    {templates.length > 0 ? templates.map((template, idx) => {
                        return (
                            <div onClick={() => setSelectedTemplate(idx)} key={idx}>
                                <TemplateCard template={template} selected={idx == selectedTemplate ? true : false} />
                            </div>
                        );
                    }) : <Loader />}
                </div>
            </div>
            {selectedTemplate != -1 ? <button onClick={() => {
                onSelect(templates[selectedTemplate]);
            }}
                className="bg-gray-900 p-3 rounded-3xl float-right text-gray-50 border border-blue-300 w-36 font-bold">
                Next
            </button> : ''}
        </div>
    )
}

export default TemplatePage