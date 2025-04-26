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

const authorityLevelsSchema = onboardingSchema.pick({
    authorityTitle: true,
    authorityKey: true,
})

type AuthorityLevelsSchema = z.infer<typeof authorityLevelsSchema>



function AuthorityLevels() {

  const router = useRouter()
  const store = useOnboardingStore()

  const form = useForm<AuthorityLevelsSchema>({
    resolver: zodResolver(authorityLevelsSchema),
    defaultValues: {
        authorityTitle: "",
        authorityKey: "",
    },
  })

    const setData = useOnboardingStore((state) =>  state.setData)

  const onSubmit = (data: AuthorityLevelsSchema) => {
    setData(data)
    router.push('/onboarding/invite-users')
  }

  useEffect(() => {
    // Only set values if they exist in the store
    const storedData = {
        authorityTitle: store.authorityTitle || "",
        authorityKey: store.authorityKey || "",
    }

    form.reset(storedData)  
  }, [form, store.authorityTitle, store.authorityKey])
  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          
          control={form.control}
          name="authorityTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authority Level Title</FormLabel>
              <FormControl>
                <Input placeholder="Pursuit" {...field} />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          
          control={form.control}
          name="authorityKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authority Level Key</FormLabel>
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

export default AuthorityLevels