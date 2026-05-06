import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocalizedMetadata } from "@lib/util/metadata"

type Props = {
  params: Promise<{ id: string }>
}
export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.OrderConfirmed")
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return <OrderCompletedTemplate order={order} />
}
