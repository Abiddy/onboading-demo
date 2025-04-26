"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { CheckIcon } from "lucide-react"

function CompletedPage() {
  const router = useRouter()
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 text-center">
      {/* Green checkmark icon */}
      <div className="bg-green-500 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center">
        <CheckIcon className="w-8 h-8" />
      </div>
      
      {/* Main heading */}
      <h1 className="text-4xl font-bold">You are ready to go!</h1>
      
      {/* Subtext with company name from store */}
      <p className="text-xl text-gray-600">
        Click the button below to start using Persuit
      </p>
      
      {/* Dashboard button */}
      <Button 
        onClick={() => router.push('/onboarding')} 
        className="mt-6 py-6 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Go to Dashboard
      </Button>
    </div>
  )
}

export default CompletedPage