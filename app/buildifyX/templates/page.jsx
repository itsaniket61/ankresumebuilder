'use client'
import TemplatePage from '@/components/TemplatesPage/TemplatePage'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
    const router = useRouter();
    const handle=(data)=>{
        router.push('/buildifyX/builder?templateName='+data.name);
    }
    const handleAI=(data)=>{
        router.push('/buildifyX/AIPage?template='+data.name);
    }
  return (
    <TemplatePage onSelect={handle} onSelectAI={handleAI}/>
  )
}

export default Page;