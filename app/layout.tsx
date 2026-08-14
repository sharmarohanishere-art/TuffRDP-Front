import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RDP.sh Landing Page',
  description: 'Next.js conversion with restored animations and FAQ interactions.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rdp-theme');var d=t?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',d==='dark');document.documentElement.dataset.theme=d;}catch(e){document.documentElement.classList.add('dark');document.documentElement.dataset.theme='dark';}})();`
          }}
        />
        <link rel="stylesheet" href="/css/app-DgoaDV-f.css" />
        <link rel="stylesheet" href="/css/app-sRfI3hCL.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
