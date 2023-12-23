import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ANK Resume Builder',
  description: 'This is a Resume Builder powered with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className+" bg-gray-950 "}>{children}</body>
    </html>
  )
}
