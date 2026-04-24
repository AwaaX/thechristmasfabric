"use client"

import { useWishlist } from "@lib/context/wishlist-context"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { FaRegStar } from "react-icons/fa"

type WishlistNavLinkProps = {
  label: string
}

const WishlistNavLink = ({ label }: WishlistNavLinkProps) => {
  const { wishlistCount } = useWishlist()

  return (
    <LocalizedClientLink
      className="hover:text-hoverGray text-black font-medium duration-300 ease-in-out text-[24px] relative tag-action-ctrl max-md:hidden"
      href="/account/wishlist"
      data-testid="nav-cart-link"
    >
      <FaRegStar />
      <div className="tag-action-swh bg-black text-white caption2 ">
        {label}
      </div>
      <span className="w-5 h-5 rounded-full bg-christmas text-white font-bold text-xs flex items-center justify-center absolute -top-3 -right-3">
        {wishlistCount}
      </span>
    </LocalizedClientLink>
  )
}

export default WishlistNavLink
