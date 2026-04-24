"use client"
import React, { useState, useTransition } from "react"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import {
  fetchTracking,
  fetchTrackingByOrder,
  OrderTrackingResponse,
  TrackingResult,
} from "@lib/data/tracking"
import clsx from "clsx"

const MILESTONES = [
  { key: "InfoReceived", label: "Info Received" },
  { key: "PickedUp", label: "Picked Up" },
  { key: "Departure", label: "Departure" },
  { key: "Arrival", label: "Arrival" },
  { key: "AvailableForPickup", label: "Available for Pickup" },
  { key: "OutForDelivery", label: "Out for Delivery" },
  { key: "Delivered", label: "Delivered" },
]

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  InTransit: "bg-blue-100 text-blue-700",
  PickedUp: "bg-indigo-100 text-indigo-700",
  Exception: "bg-red-100 text-red-700",
  Returning: "bg-orange-100 text-orange-700",
  Returned: "bg-gray-200 text-gray-700",
}

function formatDate(iso: string | null) {
  if (!iso) return "-"
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-700"
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${cls}`}
    >
      {status === "Delivered" && <Icon.CheckCircle size={16} weight="fill" />}
      {status === "InTransit" && <Icon.Truck size={16} weight="fill" />}
      {status === "Exception" && <Icon.WarningCircle size={16} weight="fill" />}
      {status}
    </span>
  )
}

function MilestoneTimeline({
  milestones,
  currentStatus,
}: {
  milestones: TrackingResult["milestone"]
  currentStatus: string
}) {
  const activeIndex = MILESTONES.findIndex((m) => m.key === currentStatus)

  return (
    <div className="flex items-start justify-between w-full overflow-x-auto py-4 gap-0">
      {MILESTONES.map((step, i) => {
        const data = milestones.find((m) => m.key_stage === step.key)
        const isDone = i <= activeIndex
        const isCurrent = step.key === currentStatus

        return (
          <div
            key={step.key}
            className="flex flex-col items-center flex-1 min-w-[80px]"
          >
            <div className="flex items-center w-full">
              {i > 0 && (
                <div
                  className={clsx(
                    "flex-1 h-[2px]",
                    isDone ? "bg-black" : "bg-gray-200"
                  )}
                />
              )}
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 z-10",
                  isCurrent
                    ? "bg-black border-black text-white"
                    : isDone
                    ? "bg-black border-black text-white"
                    : "bg-white border-gray-300 text-gray-400"
                )}
              >
                {isDone ? (
                  <Icon.Check size={14} weight="bold" />
                ) : (
                  <span className="text-[10px] font-bold">{i + 1}</span>
                )}
              </div>
              {i < MILESTONES.length - 1 && (
                <div
                  className={clsx(
                    "flex-1 h-[2px]",
                    isDone && i < activeIndex ? "bg-black" : "bg-gray-200"
                  )}
                />
              )}
            </div>
            <div className="text-center mt-2">
              <p
                className={clsx(
                  "text-[11px] font-medium leading-tight",
                  isCurrent
                    ? "text-black"
                    : isDone
                    ? "text-gray-700"
                    : "text-gray-400"
                )}
              >
                {step.label}
              </p>
              {data?.time_raw.date && (
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {data.time_raw.date}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TrackingDetails({ item }: { item: TrackingResult }) {
  const events = item.tracking?.providers?.flatMap((p) => p.events) ?? []
  const provider = item.tracking?.providers?.[0]?.provider
  const status = item.latest_status?.status || "Unknown"

  return (
    <div className="mt-6 w-full flex flex-col gap-4 border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Tracking Number
          </p>
          <p className="text-lg font-semibold">{item.tracking_number}</p>
        </div>
        <StatusBadge status={status} />
        {provider && (
          <a
            href={provider.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {provider.alias || provider.name}
          </a>
        )}
      </div>

      <MilestoneTimeline
        milestones={item.milestone ?? []}
        currentStatus={status}
      />

      <div className="text-[15px]">
        <div>
          <strong>Last update:</strong>{" "}
          {formatDate(item.latest_event?.time_iso || null)}
        </div>
        <div>
          <strong>Description:</strong> {item.latest_event?.description || "-"}
        </div>
        <div>
          <strong>Location:</strong> {item.latest_event?.location || "-"}
        </div>
        <div>
          <strong>Route:</strong>{" "}
          {item.shipping_info?.shipper_address?.country || "-"} to{" "}
          {item.shipping_info?.recipient_address?.country || "-"}
        </div>
      </div>

      {events.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
            History
          </p>
          <ol className="relative border-l border-gray-200 ml-3 flex flex-col gap-0">
            {events.map((ev, i) => (
              <li key={i} className="mb-4 ml-5">
                <span
                  className={clsx(
                    "absolute -left-2 flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-white",
                    i === 0 ? "bg-black" : "bg-gray-300"
                  )}
                />
                <p className="text-sm font-medium">{ev.description}</p>
                {ev.location && (
                  <p className="text-xs text-gray-500">{ev.location}</p>
                )}
                {ev.time_iso && (
                  <p className="text-xs text-gray-400">
                    {formatDate(ev.time_iso)}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

const OrderTracking = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [orderId, setOrderId] = useState("")
  const [orderEmail, setOrderEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [trackingResults, setTrackingResults] = useState<TrackingResult[]>([])
  const [orderResult, setOrderResult] = useState<
    (OrderTrackingResponse & { success: true }) | null
  >(null)

  const resetState = () => {
    setError(null)
    setTrackingResults([])
    setOrderResult(null)
  }

  const handleTrackByOrder = (e: React.FormEvent) => {
    e.preventDefault()
    resetState()

    startTransition(async () => {
      const res = await fetchTrackingByOrder(orderId, orderEmail)
      if (!res.success) {
        setError(res.error)
        return
      }

      setOrderResult(res)
      const list: TrackingResult[] = []

      if (res.tracking && Object.keys(res.tracking).length > 0) {
        list.push(res.tracking)
      }

      if (Array.isArray(res.trackings) && res.trackings.length > 0) {
        res.trackings.forEach((item) => {
          if (
            !list.some(
              (existing) => existing.tracking_number === item.tracking_number
            )
          ) {
            list.push(item)
          }
        })
      }

      if (!list.length) {
        setError("Order found, but no tracking details are available yet.")
      }

      setTrackingResults(list)
    })
  }

  const handleTrackByNumber = (e: React.FormEvent) => {
    e.preventDefault()
    resetState()

    startTransition(async () => {
      const res = await fetchTracking(trackingNumber)
      if (!res.success) {
        setError(res.error)
        return
      }

      setTrackingResults([res.data])
    })
  }

  return (
    <>
      <div className="order-tracking md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col items-center justify-center">
            <div className="text-[42px] leading-[55px] font-normal text-center">
              Track my order
            </div>
            <div className="left md:w-1/2 w-full border border-gray-300 bg-surface mt-4 md:mt-7">
              <div className="flex justify-around ">
                <div
                  className={`${
                    selectedTab === 0
                      ? "border-b-[3px] border-b-blue-800 "
                      : "border-b border-b-gray-300"
                  } flex-1 h-full text-center cursor-pointer px-3 py-4`}
                  onClick={() => {
                    setSelectedTab(0)
                    resetState()
                  }}
                >
                  Order Details
                </div>
                <div
                  className={`${
                    selectedTab === 1
                      ? "border-b-[3px] border-b-blue-800 "
                      : "border-b border-b-gray-300"
                  } flex-1 h-full text-center cursor-pointer px-3 py-4`}
                  onClick={() => {
                    setSelectedTab(1)
                    resetState()
                  }}
                >
                  Tracking Numbers
                </div>
              </div>

              <form
                className="px-4 py-4 duration-300 ease-linear "
                onSubmit={
                  selectedTab === 0 ? handleTrackByOrder : handleTrackByNumber
                }
              >
                {selectedTab === 0 && (
                  <>
                    <div className="mt-2 ">
                      To track your order, enter your order number and email
                      address:
                    </div>
                    <div className="email mt-8">
                      <label htmlFor="order-id">Order ID</label>
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="order-id"
                        type="text"
                        placeholder="Order Number"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="billing mt-8">
                      <label htmlFor="order-email">Order Email</label>
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="order-email"
                        type="email"
                        placeholder="Email Address"
                        value={orderEmail}
                        onChange={(e) => setOrderEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="block-button md:mt-7 mt-8">
                      <button
                        className="swh-btn bg-black text-white"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? "Tracking..." : "Track Order"}
                      </button>
                    </div>
                  </>
                )}

                {selectedTab === 1 && (
                  <>
                    <div className="mt-2 ">
                      To track your order, please enter the tracking number you
                      received in the shipping confirmation email
                    </div>
                    <div className="billing mt-8">
                      <label htmlFor="tracking-number">Tracking Number</label>
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="tracking-number"
                        type="text"
                        placeholder="Order Tracking Number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="block-button md:mt-7 mt-8">
                      <button
                        className="swh-btn bg-black text-white"
                        type="submit"
                        disabled={isPending}
                      >
                        {isPending ? "Tracking..." : "Track Order"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>

            {error && <p className="mt-4 text-red text-center">{error}</p>}

            {orderResult?.success && (
              <div className="md:w-1/2 w-full mt-4 text-[14px] text-gray-600">
                <p>
                  Order:{" "}
                  <strong>
                    #
                    {orderResult.order.custom_display_id ??
                      orderResult.order.display_id}
                  </strong>
                </p>
              </div>
            )}

            {trackingResults.length > 0 && (
              <div className="md:w-1/2 w-full">
                {trackingResults.map((item, index) => (
                  <TrackingDetails
                    key={`${item.tracking_number}-${index}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderTracking
