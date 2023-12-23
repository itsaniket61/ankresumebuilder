'use client'
import PreviewPage from '@/components/PreviewPage/PreviewPage';
import React, { useEffect,useState } from 'react';
import Loader from '../../../components/Loader/Loader';

function Builder() {
    const [jsonData,setJsonData] = useState(undefined);

    const getTemplate = async ()=>{
      const req = await fetch('/api/v1/template?templateName=New Template');
        const res = await req.json();
        console.log(res);
        setJsonData({template:res.name,data:res.sampleJsonData});
    }

    useEffect(()=>{
        getTemplate();
    })

  return (
    <div>{jsonData?<PreviewPage jsonData={jsonData}/>:<Loader/>}</div>
  )
}

export default Builder