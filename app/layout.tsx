import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import 'lenis/dist/lenis.css'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import {
  CursorProvider,
  Cursor,
} from '@/components/animate-ui/components/animate/cursor'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Cobra Terminal | The Ultimate Pump.fun Toolkit',
  description: 'Deploy. Trade. Boost. The ultimate Solana token SaaS platform with Jito bundles, volume tools, and sniper protection.',
  generator: 'v0.app',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cobra-icon.png`,
  },
  openGraph: {
    title: 'Cobra Terminal | The Ultimate Pump.fun Toolkit',
    description: 'Deploy. Trade. Boost. The ultimate Solana token SaaS platform with Jito bundles, volume tools, and sniper protection.',
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cobra-banner.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cobra Terminal | The Ultimate Pump.fun Toolkit',
    description: 'Deploy. Trade. Boost. The ultimate Solana token SaaS platform with Jito bundles, volume tools, and sniper protection.',
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/cobra-banner.png`],
  },
}

export const viewport: Viewport = {
  themeColor: '#020202',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" style={{ backgroundColor: "#020202" }}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: "html,body{background-color:#020202!important}",
          }}
        />
        <link rel="preload" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logocobra.svg`} as="image" />
      </head>
      <body className={`${manrope.variable} font-sans antialiased`} style={{ backgroundColor: "#020202" }}>
        <SmoothScroll>
          <CursorProvider global>
            {children}
            <Cursor className="size-6 text-primary drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
          </CursorProvider>
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  )
}
