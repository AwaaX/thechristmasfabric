import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in to view wishlist",
  description: "Sign in to access your wishlist.",
}

export default async function WishlistLogin({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return <LoginTemplate redirectTo={`/${countryCode}/account/wishlist`} />
}
