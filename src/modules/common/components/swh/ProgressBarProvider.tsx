// Create a Providers component to wrap your application with all the components requiring 'use client', such as nextjs-toploader or your different contexts...
"use client"

import FullPageLoader from "@modules/common/components/full-page-loader"
import NextTopLoader from "nextjs-toploader"
import { usePathname, useRouter as useNextRouter, useSearchParams } from "next/navigation"
import { flushSync } from "react-dom"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

type PageLoaderContextValue = {
  startPageLoader: () => void
  stopPageLoader: () => void
}

const PageLoaderContext = createContext<PageLoaderContextValue | null>(null)

const isModifiedEvent = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

const isInternalAnchorNavigation = (anchor: HTMLAnchorElement) => {
  if (!anchor.href || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return false
  }

  const url = new URL(anchor.href, window.location.href)

  if (url.origin !== window.location.origin) {
    return false
  }

  if (url.href === window.location.href) {
    return false
  }

  return true
}

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext)

  if (!context) {
    throw new Error("usePageLoader must be used within ProgressBarProviders")
  }

  return context
}

export const usePageLoaderRouter = () => {
  const router = useNextRouter()
  const { startPageLoader } = usePageLoader()

  return useMemo(
    () => ({
      ...router,
      push: (href: string, options?: Parameters<typeof router.push>[1]) => {
        startPageLoader()
        router.push(href, options)
      },
      replace: (href: string, options?: Parameters<typeof router.replace>[1]) => {
        startPageLoader()
        router.replace(href, options)
      },
      back: () => {
        startPageLoader()
        router.back()
      },
      forward: () => {
        startPageLoader()
        router.forward()
      },
      refresh: () => {
        startPageLoader()
        router.refresh()
      },
    }),
    [router, startPageLoader]
  )
}

const ProgressBarProviders = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsKey = searchParams.toString()
  const [isPageLoading, setIsPageLoading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopPageLoader = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setIsPageLoading(false)
  }, [])

  const startPageLoader = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    flushSync(() => {
      setIsPageLoading(true)
    })

    timeoutRef.current = setTimeout(() => {
      setIsPageLoading(false)
      timeoutRef.current = null
    }, 10000)
  }, [])

  useEffect(() => {
    stopPageLoader()
  }, [pathname, searchParamsKey, stopPageLoader])

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (isModifiedEvent(event)) {
        return
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a")

      if (!anchor || !isInternalAnchorNavigation(anchor)) {
        return
      }

      startPageLoader()
    }

    document.addEventListener("click", handleDocumentClick)

    return () => {
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [startPageLoader])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const contextValue = useMemo(
    () => ({ startPageLoader, stopPageLoader }),
    [startPageLoader, stopPageLoader]
  )
  console.log("isPageLoading", isPageLoading)

  return (
    <PageLoaderContext.Provider value={contextValue}>
      <NextTopLoader
        color="#000"
        height={4}
        showSpinner={false}
        crawl
        easing="ease"
        speed={200}
        shadow={false}
        zIndex={2000}
      />
      {isPageLoading &&
       <FullPageLoader />
       }
      {children}
    </PageLoaderContext.Provider>
  )
}

export default ProgressBarProviders
