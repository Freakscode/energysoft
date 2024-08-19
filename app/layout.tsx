import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TECHO",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='{GeistSans.className}'>
      <body className="bg-gradient-to-t from-slate-900 to-black text-foreground min-h-screen w-full bg-cover">
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
