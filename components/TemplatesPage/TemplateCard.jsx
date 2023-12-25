import React from 'react';

function TemplateCard({ template, selected }) {
    return (
        <div className="m-3">
            <div className={`text-white p-2 pb-10 border rounded-lg w-60 h-72 ${selected ? 'border-blue-500 border-4' : ''}`}>
                <img src={template.logoPath} className='h-full w-full object-cover' alt={`${template.name} Logo`} />
                <div className='w-full'>
                    <p className="text-2xl font-medium mt-1 overflow-hidden text-ellipsis whitespace-nowrap">{template.name}</p>
                </div>
            </div>
        </div>
    );
}

export default TemplateCard;
