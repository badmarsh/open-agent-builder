"use client";

import { Toaster } from "sonner";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { BigIntProvider } from "@/components/providers/BigIntProvider";
import Scrollbar from "@/components/ui/scrollbar";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <BigIntProvider>
          {children}
          <Scrollbar />
          <Toaster position="bottom-right" />
        </BigIntProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
