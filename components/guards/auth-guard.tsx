"use client";
import React, { useEffect, useState } from "react";
import { tokenStorage } from "@/storages";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token: any = tokenStorage.getAccessToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  return children;
}
