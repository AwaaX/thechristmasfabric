import { getBaseURL } from "@lib/util/env"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
