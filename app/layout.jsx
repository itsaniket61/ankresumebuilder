import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ANK Resume Builder',
  description: 'This is a Resume Builder powered with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-JPLZR1JQXN"></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JPLZR1JQXN');`}
      </Script>
      <body className={inter.className+" bg-gray-950 "}>{children}</body>
    </html>
  )
}
