
import "./globals.css";
import 'tailwindcss/tailwind.css'
import Footer from "@/components/layout/Footer";
import { Moul } from 'next/font/google';
import { NTR } from 'next/font/google';
import { MyNavbar } from "@/components/layout/MyNavbar";
import Providers from "./providers";
import { ToastProvider } from "@heroui/toast"; 

export const metadata = {
  title: "LoopsnLocks",
  description: "TYour own app to learn crotchet",
};

const moul = Moul({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-moul',
});
const ntr = NTR({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ntr',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ntr.variable} ${moul.variable} font-sans text-lg  `}>
      <head>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="h-1vh w-1vw bg-darkPurple">
        <Providers>
          <MyNavbar />
          {children}
          <ToastProvider placement="bottom-right"/>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
