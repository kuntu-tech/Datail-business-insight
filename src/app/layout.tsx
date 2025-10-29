export const metadata = {
  title: 'Business Insight',
  description: 'Insightful analysis UI prototype',
}

import './globals.css'
import React from 'react'

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

