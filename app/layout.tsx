import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://store-next-beta.vercel.app"),
  title: {
    default:
      "Next Store – Modern E-commerce Platform | Shop Online with Fast Checkout",
    template: "%s | Next Store",
  },
  description:
    "Next Store is a beautifully designed, high-performance e-commerce platform built with Next.js 14, TypeScript, and modern web technologies. Discover curated products, enjoy seamless shopping with fast checkout, secure Stripe payments, user reviews, favorites, and an intuitive admin dashboard. Experience the future of online shopping.",
  keywords: [
    "e-commerce",
    "online store",
    "next.js",
    "typescript",
    "shopping",
    "online shopping",
    "store",
    "products",
    "checkout",
    "stripe payments",
    "modern e-commerce",
    "react",
    "prisma",
    "neon db",
    "vercel blob",
    "clerk authentication",
    "shadcn ui",
    "dark mode",
    "responsive design",
    "admin dashboard",
    "product reviews",
    "favorites",
    "shopping cart",
    "secure payments",
  ],
  authors: [
    {
      name: "Arnob Mahmud",
      url: "https://www.arnobmahmud.com/",
    },
  ],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://store-next-beta.vercel.app",
    siteName: "Next Store",
    title:
      "Next Store – Modern E-commerce Platform | Shop Online with Fast Checkout",
    description:
      "Next Store is a beautifully designed, high-performance e-commerce platform built with Next.js 14. Discover curated products, enjoy seamless shopping with fast checkout, secure Stripe payments, user reviews, favorites, and an intuitive admin dashboard.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Next Store Logo - Modern E-commerce Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Store – Modern E-commerce Platform | Shop Online",
    description:
      "Beautifully designed, high-performance e-commerce platform with fast checkout, secure payments, product reviews, favorites, and admin dashboard. Built with Next.js 14 and modern web technologies.",
    images: ["/logo.png"],
    creator: "@arnob_mahmud",
    site: "@arnob_mahmud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  category: "e-commerce",
  classification: "E-commerce Platform",
  applicationName: "Next Store",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://store-next-beta.vercel.app",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <Providers>
            <Navbar />
            <Container className="py-20">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
