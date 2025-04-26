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

const inviteUsersSchema = onboardingSchema.pick({
  inviteUsers: true,
})

type InviteUsersSchema = z.infer<typeof inviteUsersSchema>



function InviteUsers() {

    const router = useRouter()
    const store = useOnboardingStore()
  const form = useForm<InviteUsersSchema>({
    resolver: zodResolver(inviteUsersSchema),
    defaultValues: {
      inviteUsers: "",
    },
  })

    const setData = useOnboardingStore((state) =>  state.setData)

    const onSubmit = (data: InviteUsersSchema) => {
    setData(data)
    router.push('/completed')
  }

  useEffect(() => {
    // Only set values if they exist in the store
    const storedData = {
        inviteUsers: store.inviteUsers || "",
      
    }

    form.reset(storedData)
  }, [form, store.inviteUsers])



  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          
          control={form.control}
          name="inviteUsers"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Invite users</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
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

export default InviteUsers