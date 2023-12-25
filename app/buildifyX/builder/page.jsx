'use client'
import PreviewPage from '@/components/PreviewPage/PreviewPage';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { useSearchParams,useRouter } from 'next/navigation';


function Builder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jsonData, setJsonData] = useState(undefined);
  const fileName = searchParams.get('name');
      

  useEffect(() => {
    const getTemplate = async () => {
      if (fileName) {
        const req = await fetch(`/api/v1/checkout?fileName=${fileName}`);
        const {content} = await req.json();
        const checkedOutFileData = JSON.parse(content);
        setJsonData({ template: checkedOutFileData.templateName, data: checkedOutFileData.jsonData});
      } else {
        const templateName = searchParams.get('templateName');
        const req = await fetch(`/api/v1/template?templateName=${templateName}`);
        const res = await req.json();
        setJsonData({ template: templateName, data: res.sampleJsonData });
      }
    }
    getTemplate();
  }, [])

  return (
    <div>{jsonData ? <PreviewPage jsonData={jsonData} onDataChange={(d)=>{}}/> : <Loader />}</div>
  )
}

export default Builder