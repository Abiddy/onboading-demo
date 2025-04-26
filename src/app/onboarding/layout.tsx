"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboardingStore } from "./store";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const store = useOnboardingStore();
  

  const [completionStatus, setCompletionStatus] = useState({
    companyProfile: false,
    personas: false,
    authorityLevels: false,
    inviteUsers: false,
  });

  // checking if required feilds are available the store!
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
    { 
      href: "/onboarding/authority-levels", 
      label: "Authority levels", 
      completed: completionStatus.authorityLevels,
      enabled: completionStatus.companyProfile && completionStatus.personas
    },
    { 
      href: "/onboarding/invite-users", 
      label: "Invite users", 
      completed: completionStatus.inviteUsers,
      enabled: completionStatus.companyProfile && completionStatus.personas && completionStatus.authorityLevels
      }
  ];

  return (
    <div className="min-h-screen grid grid-cols-[1fr_3fr]">
      <aside className="border-r border-gray-200 p-4">
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <div key={link.href} className="flex items-center gap-2">
              <Checkbox 
                checked={link.completed}
                className={link.completed ? "rounded-full data-[state=checked]:bg-green-700 data-[state=checked]:text-white data-[state=checked]:border-green-700" : "rounded-full"}
   
              />
              {link.enabled ? (
                <Link 
                  href={link.href}
                  className={`text-left hover:text-black ${
                    pathname === link.href ? "text-black font-medium" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <span className="text-left text-gray-400 cursor-not-allowed">
                  {link.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
