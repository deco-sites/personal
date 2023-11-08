import type { Product } from "deco-sites/std/commerce/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

interface Props {
  product: Product | undefined; // Certifique-se de que 'product' possa ser 'undefined'
}

function ProductCard({ product }: Props) {
  if (!product) {
    return null; // Trate o caso em que 'product' é nulo
  }

  const {
    image: images,
  } = product;

  const getTotalDiscount = () => {
    const listPrice = product.offers?.highPrice ?? 0; // Defina um valor padrão
    const bestPrice = product.offers?.lowPrice ?? 0; // Defina um valor padrão
    if (listPrice > bestPrice) {
      return ((listPrice - bestPrice) * 100) / listPrice;
    }
    return 0; // Certifique-se de que a função retorne um número em todos os casos
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="w-[297px] shrink-0 rounded-md bg-white select-none">
      <a href={product.isVariantOf?.url}>
        <div className="relative mb-1">
          <Image
            src={images?.[0]?.url || ""}
            alt={product.isVariantOf?.name}
            title={product.isVariantOf?.name}
            loading="lazy"
            width={297}
            height={445}
            className="rounded-t-md h-full object-cover" // Use 'className' em vez de 'class'
          />
        </div>
        <div className="flex flex-col text-sm items-start p-4 ">
          <p className="font-bold min-h-[60px] text-left">
            {product.isVariantOf?.name}
          </p>
          <div className="flex gap-1">
            {getTotalDiscount() > 0 && (
              <div className="rounded-2xl bg-green-600 text-white px-2">
                {getTotalDiscount()}%
              </div>
            )}
          </div>
          {product.offers?.highPrice !== undefined &&
            product.offers?.lowPrice !== undefined &&
            product.offers?.highPrice > product.offers?.lowPrice && (
            <del>{formatPrice(product.offers?.highPrice)}</del>
          )}
          <span className="font-bold text-lg ">
            {typeof product.offers?.lowPrice === "number" &&
                product.offers.lowPrice > 0
              ? formatPrice(product.offers.lowPrice)
              : null}
          </span>
          <div className="my-1 flex flex-col">
            <span className="text-purple-600 font-semibold text-left">
              Black Friday
            </span>
            <span className="text-red-600 font-semibold text-left">Outlet</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
