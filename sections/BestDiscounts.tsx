import Carousel from "deco-sites/start/islands/Carousel/index.tsx";
import SectionTitle from "../components/SectionTitle/index.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  products: Product[] | null;
}

export default function BestDiscounts({ products }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#171111] flex w-full items-center sm:items-start flex-col pt-10 sm:px-[8vw] max-[768px]:pr-0">
      <SectionTitle symbol="$" text="MAIORES" markedText="DESCONTOS" />
      <Carousel products={products} />
    </section>
  );
}
