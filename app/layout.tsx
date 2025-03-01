import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DEV Blog",
  description:
    "A Blog Website to discuss everything new in the Developers community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={(cn("bg-primary-50 dark:bg-gray-900"), poppins.variable)}
      >
        <Toaster
          position="top-center"
          gutter={10}
          containerClassName="toast"
          toastOptions={{
            duration: 4000,
            success: {
              style: {
                color: "#fff",
                backgroundColor: "rgb(34 197 94)",
              },
            },
            error: {
              style: {
                color: "#fff",
                backgroundColor: "rgb(239 68 68)",
              },
            },
          }}
        />
        <ThemeProvider attribute="class" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
