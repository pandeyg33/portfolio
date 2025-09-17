// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import RandomFavicon from "@/components/RandomFavicon";
import BrandCorner from "@/components/BrandCorner";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // ← update when you deploy
  applicationName: "Abhimanyu Pandey - Portfolio",
  title: {
    default: "Abhimanyu Pandey - ML + Full-Stack",
    template: "%s • Abhimanyu Pandey",
  },
  description:
    "Portfolio of Abhimanyu Pandey - ML practitioner & full-stack engineer. Projects, skills, and contact.",
  keywords: [
    "Abhimanyu Pandey",
    "Machine Learning",
    "Data Science",
    "AI",
    "Software Engineer",
    "Software Developer",
    "Portfolio",
    "Projects",
    "Skills",
    "Contact",
    "Resume",
    "CV",
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Django",
    "Flask",
    "AWS",
    "Docker",
    "Kubernetes",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "React Native",
    "Vue.js",
    "Angular",
    "Golang",
    "Ruby on Rails",
    "DevOps",
    "Agile",
    "Scrum",
    "GitHub",
    "LinkedIn",
    "Instagram",
    "Tech Enthusiast",
    "Tech Blogger",
    "Hackathons",
    "Full-Stack",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "Portfolio",
  ],
  authors: [{ name: "Abhimanyu Pandey" }],
  creator: "Abhimanyu Pandey",
  publisher: "Abhimanyu Pandey",

  // Social/preview cards
  openGraph: {
    type: "website",
    url: "https://your-domain.com/",
    siteName: "Abhimanyu Pandey - Portfolio",
    title: "Abhimanyu Pandey - ML + Full-Stack",
    description:
      "Projects that blend ML with solid engineering. Explore skills and get in touch.",
    images: [
      // put an OG image at /public/og.png (1200×630 recommended)
      { url: "/og.png", width: 1200, height: 630, alt: "Abhimanyu Pandey" },
    ],
    locale: "en_US",
  },

  // Icons/favicons
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
  //     { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  //   ],
  //   apple: [{ url: "/apple-touch-icon.png" }],
  //   shortcut: ["/favicon.ico"],
  // },

  manifest: "/site.webmanifest",

  // Address-bar color on mobile (light vs dark)
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
  //   { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  // ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="theme-fade">
        <ThemeProvider
          attribute="class" // <html class="light"> (dark by default)
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <RandomFavicon />
          <BrandCorner />
          {children}
          <ThemeToggle />
          {/* Optional veil, can remove if you only want ripple */}
          <div aria-hidden className="theme-overlay" />
        </ThemeProvider>
      </body>
    </html>
  );
}
