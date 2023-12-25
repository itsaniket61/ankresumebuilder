import React, { useState } from 'react'
import TemplatePage from '../TemplatesPage/TemplatePage';
import AIForm from '../AIForm/AIForm';

function Wizard() {
    const [selectedTemplate, setSelectedTemplate] = useState(undefined);
    
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <>
           <h1 className="text text-white mx-auto my-auto">
                ANK Resume Builder
           </h1>
        </>
    )
}

export default Wizard;