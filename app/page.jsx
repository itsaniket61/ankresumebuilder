'use client'
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import Loader from "@/components/Loader/Loader";
import Wizard from "@/components/Wizard/Wizard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    if(true){
      router.replace('buildifyX/templates');
    }else{
  
    }
  })
  return (
    <main className='p-2'>
      {/* <Wizard/> */}
      <Loader/>
    </main>
  )
}
