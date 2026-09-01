import type { Metadata } from "next"
import { Spectral, Lato } from "next/font/google"
import Script from "next/script"
import { META_PIXEL_ID } from "@/lib/config"
import "./globals.css"

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-spectral",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Antisilla — The Health Dealer",
  description:
    "Por qué entrenas duro, comes bien, y sigues sin bajar grasa. El mecanismo, y el protocolo de 5 puntos para desarmarlo.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${spectral.variable} ${lato.variable}`}>
      <head>
        {META_PIXEL_ID && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </head>
      <body className="bg-cream text-carbon font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
