# Multi-Step Onboarding Application

This application demonstrates a robust, user-friendly onboarding flow built with Next.js, TypeScript, Zod, and Zustand. It showcases several modern React development best practices for form handling, state management, and UI/UX design.

## Core Features

- Multi-step form wizard with progressive disclosure
- Form validation using Zod schema
- Global state management with Zustand
- Persistent storage through localStorage
- Dynamic navigation based on completion status

## Technical Implementation

### 1. Modular Page Structure

Each step of the onboarding process is encapsulated in its own page component:

- `/onboarding/company-profile`
- `/onboarding/personas`
- `/onboarding/authority-levels`
- `/onboarding/invite-users`
- `/completed`

This separation of concerns makes the codebase easier to maintain and understand, allowing independent development and testing of each step.

### 2. Unified Schema Validation with Zod

A single source of truth for validation logic is defined using Zod:

```typescript
// src/schema.ts
export const onboardingSchema = z.object({
  companyName: z.string().min(3).max(20),
  website: z.string().url().min(1, "Website is required"),
  industry: z.string(),
  prompt: z.string(),
  keywords: z.string(),
  personasTitle: z.string().min(2).max(50),
  personasKey: z.string().min(2).max(50),
  authorityTitle: z.string().min(2).max(50),
  authorityKey: z.string().min(2).max(50),
  inviteUsers: z.string().email("Invalid email"),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
```

Each page then uses Zod's `pick()` method to extract only the relevant fields for that step:

```typescript
// Example for the personas page
const personasSchema = onboardingSchema.pick({
  personasTitle: true,
  personasKey: true,
});

type PersonasSchema = z.infer<typeof personasSchema>;
```

This approach ensures:
- Consistent validation rules across the application
- Type safety through TypeScript inference
- DRY (Don't Repeat Yourself) principles by reusing validation logic

### 3. Global State Management with Zustand

A Zustand store manages the application state, with persistent storage through localStorage:

```typescript
// src/app/onboarding/store.ts
type OnboardingState = Partial<OnboardingSchema> & { 
  setData: (data: Partial<OnboardingSchema>) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "onboarding",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

Key benefits of this approach:
- Centralized state management
- Partial updates through the `setData` action
- Persistence between sessions
- Type safety by leveraging the schema type

### 4. Conditional Navigation Logic

The layout component implements sophisticated logic to track completion status and enable/disable navigation:

```typescript
// src/app/onboarding/layout.tsx
useEffect(() => {
  setCompletionStatus({
    companyProfile: !!store.companyName,
    personas: !!store.personasTitle && !!store.personasKey,
    authorityLevels: !!store.authorityTitle && !!store.authorityKey,
    inviteUsers: !!store.inviteUsers
  });
}, [store]);

const navLinks = [
  { 
    href: "/onboarding/company-profile", 
    label: "Company profile", 
    completed: completionStatus.companyProfile,
    enabled: true // Step 1 is always enabled
  },
  { 
    href: "/onboarding/personas", 
    label: "Personas", 
    completed: completionStatus.personas,
    enabled: completionStatus.companyProfile
  },
  // Additional steps...
];
```

This approach:
- Prevents users from accessing steps out of order
- Provides visual feedback on completion status
- Creates a guided experience through the onboarding process
- Updates dynamically as users complete each step

### 5. Form Data Persistence and Retrieval

Each form loads its initial values from the store, allowing users to resume their progress:

```typescript
useEffect(() => {
  // Only set values if they exist in the store
  const storedData = {
    personasTitle: store.personasTitle || "",
    personasKey: store.personasKey || "",
  }
  
  form.reset(storedData)
}, [form, store.personasTitle, store.personasKey])
```

## UI/UX Considerations

- Visual completion indicators (checkboxes)
- Progressive disclosure of form fields
- Disabled navigation for incomplete steps
- Clear success feedback on completion
- Responsive design for various devices

## Development Benefits

This architecture provides several advantages:

1. **Scalability**: Adding new steps is straightforward
2. **Maintenance**: Changes to validation rules are made in one place
3. **Testability**: Each component can be tested in isolation
4. **Developer Experience**: Strong typing prevents errors
5. **Performance**: Only necessary components are rendered
6. **User Experience**: Progress is saved automatically

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zod Documentation](https://zod.dev/)
- [ShadcnUI Documentation](https://ui.shadcn.com/)
