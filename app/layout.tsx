import { Poppins } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(cn("grainy-light dark:bg-dark-300"), poppins.variable)}>
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
