import React, { useEffect, useState } from 'react';

function DynamicForm({ jsonData, onChange }) {
  const [formData, setFormData] = useState(jsonData);

  useEffect(()=>{
    onChange(formData||jsonData);
    console.log(formData,jsonData);
  },[]);

  const renderFormFields = (data, arrayIndex = '', arrayAttribute = '') => {
    return Object.keys(data).map((key, index) => {
      const value = data[key];
      const inputType = Array.isArray(value) ? 'array' : 'text';

      if (inputType === 'array') {
        return (
          <div key={index} className="bg-blue-950 rounded p-2 m-4">
            <div>
              {value.map((item, subIndex) => (
                <div key={subIndex} className='bg-slate-900 p-1 mb-1 rounded-md'>
                  <label className="text-white text-2xl font-bold"><i>{key.charAt(0).toUpperCase() + key.slice(1)} {subIndex + 1}</i></label>
                  <div>
                    {renderFormFields(item, key, subIndex)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      const parentKey = '';
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      return (
        <div key={fullKey} className='bg-blue-950 rounded p-2 mx-4 my-2'>
          <label className="text-white text-xl font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</label><br />
          <input
            type={inputType}
            id={arrayIndex === '' ? formData[key] : formData[arrayIndex][arrayAttribute][key]}
            name={fullKey}
            value={arrayIndex === '' ? formData[key] : formData[arrayIndex][arrayAttribute][key]}
            className='border border-blue-300 rounded-lg w-full text-2xl p-2 font-semibold text-white bg-gray-900'
            onChange={(e) => handleInputChange(key, arrayIndex, arrayAttribute, e.target.value)}
          />
        </div>
      );
    });
  };


  const handleInputChange = (key, arrayIndex, arrayAttribute, value) => {
    setFormData((prevFormData) => {
      if (arrayIndex === '') {
        return { ...prevFormData, [key]: value };
      } else {
        const updatedArray = [...prevFormData[arrayIndex]];
        updatedArray[arrayAttribute] = {
          ...updatedArray[arrayAttribute],
          [key]: value,
        };

        return { ...prevFormData, [arrayIndex]: updatedArray };
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    onChange(formData);
  };

  return (
    <form onChange={handleChange}>
      {renderFormFields(jsonData)}
    </form>
  );
}

export default DynamicForm;
