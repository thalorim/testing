import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Arda Gulez | Full Stack Developer",
  description: "Portfolio of Arda Gulez - Full Stack Developer",
  authors: [{ name: "Arda Gulez", url: "https://raikou.me" }],
  keywords: ["Arda Gulez", "Full Stack Developer", "Portfolio", "devRaikou", "Web Development"],
  icons: {
    icon: [
      {
        url: '/profile.jpg',
        href: '/profile.jpg',
      },
    ],
    shortcut: '/profile.jpg',
    apple: '/profile.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange enableColorScheme={false}>
          {children}
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
