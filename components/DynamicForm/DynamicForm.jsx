import React, { useEffect, useState } from 'react';

function DynamicForm({ jsonData, onChange }) {
  const [formData, setFormData] = useState(jsonData);

  useEffect(() => {
    onChange(formData || jsonData);
  }, [formData, jsonData, onChange]);

  const renderFormFields = (data, arrayIndex = '', arrayAttribute = '') => {
    return Object.keys(data).map((key, index) => {
      const value = data[key];
      const inputType = Array.isArray(value) ? 'array' : 'text';

      if (inputType === 'array') {
        if(value.length==0) return <></>;
        return (
          <div key={index} className="border-gray-600 border-2 rounded p-2 m-4">
            <div>
              {value.map((item, subIndex) => (
                <div key={subIndex} className=' p-1 mb-1 rounded-md'>
                  <label className="text-white text-lg"><i>{key.charAt(0).toUpperCase() + key.slice(1)} {subIndex + 1}</i></label>
                  <span className='inline-block w-4'/>
                  <button
                    className='bg-blue-900 hover:bg-blue-700 text-white rounded-full p-1 focus:outline-none transition duration-300 ease-in-out shadow-lg'
                    onClick={(e) => { e.preventDefault(); handleAddArrayItem(key, value[0]); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512" fill='white'>
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                  </button>
                  <button
                    className='bg-red-900 hover:bg-red-700 text-white rounded-full p-1 ml-2 focus:outline-none transition duration-300 ease-in-out shadow-lg'
                    onClick={(e) => { e.preventDefault(); handleRemoveArrayItem(key, subIndex); }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 448 512" fill='white'>
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>
                  </button>
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
        <div key={fullKey} className='relative z-0 w-full mb-5 group mt-2'>
          <input
            type={inputType} name={fullKey} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
            id={arrayIndex === '' ? formData[key] : formData[arrayIndex][arrayAttribute][key]}            
            value={arrayIndex === '' ? formData[key] : formData[arrayIndex][arrayAttribute][key]}
            onChange={(e) => handleInputChange(key, arrayIndex, arrayAttribute, e.target.value)}
          />
          
          <label htmlFor={`floating_${key.charAt(0).toUpperCase() + key.slice(1)}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
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
        onChange();
        return { ...prevFormData, [arrayIndex]: updatedArray };
      }
    });
  };

  const handleAddArrayItem = (key, newObject) => {
    setFormData((prevFormData) => {
      const existingArray = prevFormData[key] || [];
      const updatedArray = [...existingArray, newObject];

      return {
        ...prevFormData,
        [key]: updatedArray,
      };
    });
  };

  const handleRemoveArrayItem = (key, index) => {
    setFormData((prevFormData) => {
      const updatedArray = [...prevFormData[key]];
      updatedArray.splice(index, 1);

      return {
        ...prevFormData,
        [key]: updatedArray,
      };
    });
  };

  return (
    <form>
      {renderFormFields(formData)}
    </form>
  );
}

export default DynamicForm;
