'use client'
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import Loader from "@/components/Loader/Loader";
import Wizard from "@/components/Wizard/Wizard";
import { useEffect, useState } from "react"

export default function Home() {
  
  return (
    <main className='p-2'>
      {/* <Wizard/> */}
      <Wizard/>
    </main>
  )
}
