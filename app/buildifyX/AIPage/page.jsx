'use client'
import AIForm from '@/components/AIForm/AIForm'
import Loader from '@/components/Loader/Loader';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
  const searchParams = useSearchParams();
  const template = searchParams.get('template');
  const [templateData, setTemplateData] = useState(undefined);



  useEffect(() => {
    const fetchTemplate = async () => {
      const req = await fetch('/api/v1/template?templateName=' + template);
      if (req.status == 200) {
        const data = await req.json();
        setTemplateData(data);
        console.log('temp', templateData);
      }
    }
    fetchTemplate(template);
  }, []);

  return (
    <>
      {templateData ? <AIForm template={templateData} /> : <Loader />}
    </>


  )
}

export default Page