"use client"
import React, { useEffect } from 'react'
import { onboardingSchema } from '@/schema'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '../store'

const companyProfileSchema = onboardingSchema.pick({
        companyName: true,
        website: true,
        industry: true,
        prompt: true,
        keywords: true,
})

type CompanyProfileSchema = z.infer<typeof companyProfileSchema>



function CompanyProfile() {

  const router = useRouter()
  const store = useOnboardingStore()
  const setData = useOnboardingStore((state) =>  state.setData)

  const form = useForm<CompanyProfileSchema>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
        companyName: "",
        website: "",
        industry: "",
        prompt: "",
        keywords: "",
    },
  })

  useEffect(() => {
    // Only set values if they exist in the store
    const storedData = {
      companyName: store.companyName || "",
      website: store.website || "",
      industry: store.industry || "",
      prompt: store.prompt || "",
      keywords: store.keywords || "",
    }
    
    form.reset(storedData)
  }, [form, store.companyName, store.website, store.industry, store.prompt, store.keywords])


  const onSubmit = (data: CompanyProfileSchema) => {
    setData(data);
    router.push('/onboarding/personas')
  }



  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Pursuit" {...field} />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://pursuit.com" {...field} />
              </FormControl>
         
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-600">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default CompanyProfile