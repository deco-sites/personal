import BlackFridayDescription, {
  Props as BlackFridayDescriptionProps,
} from "../components/Home/BlackFridayDescription.tsx";
import {
  Props as ShowCaseCarouselProps,
} from "../components/Home/ShowCaseCarousel.tsx";
import ShowCaseCarousel from "../islands/ShowCaseCarousel/index.tsx";
import BenefitBar, {
  Props as BenefitBarProps,
} from "../components/Home/BenefitBar.tsx";
import Header, { Props as HeaderProps } from "../components/Header/index.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  products: Product[] | null;
  header?: HeaderProps;
  blackFridayDesciption?: BlackFridayDescriptionProps;
  showCaseCarousel?: ShowCaseCarouselProps;
  banefitBar?: BenefitBarProps;
}

export default function Home({
  header,
  blackFridayDesciption,
  showCaseCarousel,
  banefitBar,
  products,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        backgroundImage:
          "url('/backgroundSphere.svg'), url('/backgroundTexture.webp'), linear-gradient(to bottom, #5b0d0d, #151111)",
        backgroundPosition: "center, center",
        backgroundSize: "40vw, cover, 100vw",
      }}
      className="min-h-screen w-full bg-no-repeat"
    >
      <Header {...header} />
      <div className=" w-full h-full flex flex-col items-center justify-center gap-16 sm:px-[8vw]">
        <div className="flex flex-col md:flex-row items-center justify-center w-full md:justify-between md:items-center">
          <div className="px-[10vw] sm:px-0">
            <BlackFridayDescription {...blackFridayDesciption} />
          </div>
          <ShowCaseCarousel products={products} {...showCaseCarousel} />
        </div>
        <div class="w-full px-3">
          <BenefitBar {...banefitBar} />
        </div>
      </div>
    </section>
  );
}
