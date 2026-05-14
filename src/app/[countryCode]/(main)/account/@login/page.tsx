import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { getLocalizedMetadata } from "@lib/util/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.Account.Login")
}

export default async function Login({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  return <LoginTemplate redirectTo={`/${countryCode}/account`} />
}
