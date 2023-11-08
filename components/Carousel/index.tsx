import SliderControllerJS from "../../islands/SliderJS/index.tsx";
import Slider from "../ui/Slider/index.tsx";
import Icon from "../ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { JSX } from "preact";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ProductCard from "./../ProductCard/index.tsx";
import DiscountCard, { Props as Category } from "../DiscountCard/index.tsx";

type Props = JSX.IntrinsicElements["div"] & {
  products?: Product[];
  categories?: Category[];
};
const Controls = () => {
  return (
    <>
      <div class="hidden md:flex items-center justify-center z-10 col-start-1 row-start-2">
        <button
          class="h-12 w-12 -ml-12 flex items-center justify-start"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-default-inverse text-red-600"
            size={30}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </button>
      </div>
      <div class="hidden md:flex items-center justify-center z-10 col-start-3 row-start-2">
        <button
          data-slide="next"
          aria-label="Next item"
          class="h-12 w-12 -mr-12 flex items-center justify-end"
        >
          <Icon
            class="text-default-inverse text-red-600"
            size={30}
            id="ChevronRight"
            strokeWidth={3}
          />
        </button>
      </div>
    </>
  );
};

const Carousel = (
  { class: _class, products, categories }: Props,
) => {
  const id = useId() + Date.now();

  return (
    <div
      id={id}
      class={`w-full relative grid grid-cols-[20px_1fr_20px] grid-rows-3 ${_class}`}
    >
      <Slider
        class={`col-span-full row-span-full scrollbar-none gap-5`}
      >
        {products?.length
          ? products?.map((e) => (
            <ProductCard
              product={e}
            />
          ))
          : categories?.map((e) => (
            <DiscountCard
              category={e.category}
              discount={e.discount}
              link={e.link}
            />
          ))}
      </Slider>

      <Controls />

      <SliderControllerJS rootId={id} />
    </div>
  );
};

export default Carousel;
