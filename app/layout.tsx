import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Verde & Salt - Modern Mediterranean Cuisine',
  description: 'Experience the finest Mediterranean dining in a warm, elegant atmosphere.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
