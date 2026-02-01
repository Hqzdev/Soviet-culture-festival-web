import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Код Времени | Советская культура 1945–1991',
  description: 'Цифровой фестиваль-архив советской культуры второй половины XX века. Погрузитесь в эпоху через музыку, литературу, живопись и кинематограф.',
  keywords: ['советская культура', 'СССР', 'история', 'фестиваль', 'музей', '1945-1991'],
  icons: {
    icon: '/images/icon.png',
    apple: '/images/icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1625',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
