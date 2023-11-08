import Carousel from "../../islands/Carousel/index.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
export interface Props {
  products: Product[];
  startMarkedText?: string;
  midText?: string;
  endMarkedText?: string;
}

const ShowCaseCarousel = ({
  products,
  startMarkedText = "%",
  midText = "DESTAQUES",
  endMarkedText = "BF23",
}: Props) => {
  return (
    <div className="w-full sm:w-[297px] text-center">
      <p className="text-gray-300 text-lg mb-4">
        <span className="text-red-800">{startMarkedText}</span> {midText}{" "}
        <span className="font-bold text-white">{endMarkedText}</span>
      </p>
      <Carousel class="gap-4" products={products} />
    </div>
  );
};

export default ShowCaseCarousel;
