import React, { useState } from 'react'
import TemplatePage from '../TemplatesPage/TemplatePage';
import AIForm from '../AIForm/AIForm';

function Wizard() {
    const [selectedTemplate, setSelectedTemplate] = useState(undefined);
    
    const handleTemplateSelect = (template) => {
        console.log(selectedTemplate);
        setSelectedTemplate(template);
    };

    return (
        <>
            {selectedTemplate ?
                <AIForm template={selectedTemplate} />
                :
                <TemplatePage onSelect={handleTemplateSelect} />}
        </>
    )
}

export default Wizard;