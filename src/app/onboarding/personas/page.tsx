"use client"
import React, { useEffect } from 'react'
import { onboardingSchema, OnboardingSchema } from '@/schema'
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

const personasSchema = onboardingSchema.pick({
  personasTitle: true,
  personasKey: true,
})

type PersonasSchema = z.infer<typeof personasSchema>



function Personas() {

    const router = useRouter()
    const store = useOnboardingStore()
  const form = useForm<PersonasSchema>({
    resolver: zodResolver(personasSchema),
    defaultValues: {
      personasTitle: "",
      personasKey: "", 
    },
  })

    const setData = useOnboardingStore((state) =>  state.setData)

  const onSubmit = (data: PersonasSchema) => {
    setData(data)
    router.push('/onboarding/authority-levels')
  }

  useEffect(() => {
    // Only set values if they exist in the store
    const storedData = {
      personasTitle: store.personasTitle || "",
      personasKey: store.personasKey || "",
    }

    form.reset(storedData)
  }, [form, store.personasTitle, store.personasKey])



  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          
          control={form.control}
          name="personasTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personas Title</FormLabel>
              <FormControl>
                <Input placeholder="Personas" {...field} />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="personasKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personas Key</FormLabel>
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

export default Personas