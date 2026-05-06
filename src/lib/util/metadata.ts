import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

type MetadataValues = Record<string, string | number>

export async function getLocalizedMetadata(
  namespace: string,
  values?: MetadataValues
): Promise<Metadata> {
  const t = await getTranslations(namespace)

  return {
    title: t("title", values),
    description: t("description", values),
  }
}
