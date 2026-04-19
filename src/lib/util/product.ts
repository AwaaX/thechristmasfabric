import { HttpTypes } from "@medusajs/types";

export const isSimpleProduct = (product: HttpTypes.StoreProduct): boolean => {
    return product.options?.length === 1 && product.options[0].values?.length === 1;
}

export const getDefaultProductVariant = (
    product: HttpTypes.StoreProduct
): HttpTypes.StoreProductVariant | undefined => {
    const variants = product.variants ?? [];

    return (
        variants.find((variant) => {
            if (!variant.manage_inventory) {
                return true;
            }

            if (variant.allow_backorder) {
                return true;
            }

            return (variant.inventory_quantity ?? 0) > 0;
        }) ?? variants[0]
    );
}
