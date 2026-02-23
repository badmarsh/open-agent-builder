import { GeistMono } from "geist/font/mono";
import { Roboto_Mono } from "next/font/google";
import ColorStyles from "@/components/shared/color-styles/color-styles";
import AppProviders from "@/components/providers/AppProviders";
import "styles/main.css";
import type { Metadata } from "next";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Open Agent Builder",
  description: "Build AI agents and workflows with visual programming",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} ${robotoMono.variable} font-sans text-accent-black bg-background-base overflow-x-clip`}
        suppressHydrationWarning
      >
        <ColorStyles />
        <AppProviders>
          <main className="overflow-x-clip">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
