"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to onboarding when the component mounts
    router.push("/onboarding/company-profile");
  }, [router]);

  // Return a simple loading state while redirection happens
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to onboarding...</p>
    </div>
  );
}