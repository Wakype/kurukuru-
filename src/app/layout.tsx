import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herta Space Station | Kuru Kuru Tap Game",
  description:
    "Squish Madam Herta and watch her spin! A fan-made web clicker game.",
  icons: {
    icon: "/favicon.gif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
