/**
 * Convex Client for Server-Side Operations
 *
 * This replaces Upstash Redis for workflow storage
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";

let convexClient: ConvexHttpClient | null = null;

/**
 * Get an unauthenticated Convex client
 * Use getAuthenticatedConvexClient() when user auth is needed
 */
export function getConvexClient(): ConvexHttpClient {
  if (!convexClient) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!url) {
      throw new Error(
        'Convex URL not configured. ' +
        'Please add NEXT_PUBLIC_CONVEX_URL to .env.local'
      );
    }

    try {
      convexClient = new ConvexHttpClient(url);
    } catch (error) {
      console.error('Failed to initialize Convex client:', error);
      throw new Error(`Convex client initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return convexClient;
}

/**
 * Get an authenticated Convex client with Clerk token
 * This ensures userId is properly set in Convex context
 */
export async function getAuthenticatedConvexClient(): Promise<ConvexHttpClient> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) {
    throw new Error(
      'Convex URL not configured. ' +
      'Please add NEXT_PUBLIC_CONVEX_URL to .env.local'
    );
  }

  const client = new ConvexHttpClient(url);

  try {
    // Get Clerk auth token
    const { getToken } = await auth();
    const template = process.env.CLERK_JWT_TEMPLATE?.trim();
    let token: string | null = null;

    // Only request a template token when explicitly configured
    if (template) {
      try {
        token = await getToken({ template });
      } catch (templateError) {
        console.warn(
          `Clerk JWT template "${template}" failed. Falling back to default token.`,
          templateError
        );
        token = await getToken();
      }
    } else {
      token = await getToken();
    }

    // Set the authentication token
    if (token) {
      client.setAuth(token);
    } else {
      console.warn('No Clerk token available - using unauthenticated client');
    }
  } catch (error) {
    console.warn('Failed to get Clerk token, using unauthenticated Convex client:', error);
    // Continue with unauthenticated client instead of throwing
    // This allows the app to function even if Clerk auth fails
  }

  return client;
}

/**
 * Check if Convex is configured
 */
export function isConvexConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_CONVEX_URL;
}

// Export API for convenience
export { api };
export type { ConvexHttpClient };
