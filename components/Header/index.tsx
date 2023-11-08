import type { Image as DecoImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  buttonValue?: {
    value?: string;
    responsiveValue?: string;
  };
  picture?: DecoImage;
}

const Header = ({
  buttonValue = {
    value: "VER OFERTAS",
    responsiveValue: "OFERTAS",
  },
  picture = "/theAlfred.svg",
}: Props) => {
  return (
    <header className="bg-transparent z-10 top-0 h-24 w-full flex justify-between items-center px-[8vw]">
      <Image
        src={picture}
        alt="logo"
        title="logo"
        width={80}
        height={30}
        loading="lazy"
      />
      <button className="rounded-3xl py-1 px-6 text-white bg-white bg-opacity-50">
        <span className="inline-flex sm:hidden">
          {buttonValue?.responsiveValue?.length
            ? buttonValue?.responsiveValue
            : buttonValue.value}
        </span>
        <span className="hidden sm:inline-flex">
          {buttonValue.value}
        </span>
      </button>
    </header>
  );
};

export default Header;
