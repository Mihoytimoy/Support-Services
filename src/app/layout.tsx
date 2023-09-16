import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Support-Services',
  description: 'Generated by create next app',
  viewport: 'initial-scale=1, width=device-width',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={poppins.className}>{children}</body>
          
      </html>
  )
}
