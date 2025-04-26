import { z } from "zod"

export const onboardingSchema = z.object({
    companyName: z.string().min(3).max(20),
    website: z.string().url().min(1, "Website is required"),
    industry: z.string(),
    prompt: z.string(),
    keywords: z.string(),
    personasTitle: z.string().min(2, "Title must be at least 2 characters").max(50),
    personasKey: z.string().min(2, "Key must be at least 2 characters").max(50),
    authorityTitle: z.string().min(2, "Title must be at least 2 characters").max(50), 
    authorityKey: z.string().min(2, "Key must be at least 2 characters").max(50),
    inviteUsers: z.string().email("Invalid email"),
})

export type OnboardingSchema = z.infer<typeof onboardingSchema>