import { getLocale } from "@lib/data/locale-actions"
import { getBaseURL } from "@lib/util/env"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Metadata } from "next"
import { Jost } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import Script from "next/script"
import "styles/styles.scss"
import ProgressBarProviders from "@modules/common/components/swh/ProgressBarProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Christmas Fabric",
  url: "https://www.thechristmasfabric.com/",
  logo: "https://www.thechristmasfabric.com/wp-content/uploads/2022/08/cropped-thechristmasfabric-icon-32x32.png",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const locale = await getLocale()

  return (
    <html lang={locale || ""} data-mode="light">
      <body className={jost.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="relative">
          {" "}
          <NextIntlClientProvider><ProgressBarProviders>{props.children}</ProgressBarProviders></NextIntlClientProvider>
        </main>
        <Script id="show-hide-header" strategy="beforeInteractive">
          {`
           let prevScrollPos = window.scrollY;
          const header = document.getElementById('header');



          window.addEventListener('scroll', () => {
            const currentScrollPos = window.scrollY ;
        
            if (currentScrollPos <=100) {
              // Scrolling up
              header?.classList.remove('show-header')
            }
            else if (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 20) {
              // Scrolling up
              header?.classList.add('show-header')
            } else if(prevScrollPos < currentScrollPos && currentScrollPos-prevScrollPos > 20) {
              // Scrolling down
              header?.classList.remove('show-header')
            }else{

            }
        
            prevScrollPos = currentScrollPos;
          });

          

          
          `}
        </Script>
        <SpeedInsights />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
