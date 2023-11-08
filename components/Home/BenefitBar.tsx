import type { Image as DecoImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
type BenefitItemProps = {
  topMarkedText: string;
  bottomText: string;
  bottomMarkedText: string;
  picture?: DecoImage;
};

export interface Props {
  startItem?: BenefitItemProps;
  midItem?: BenefitItemProps;
  endItem?: BenefitItemProps;
}

const BenefitItem = (
  { topMarkedText, bottomText, bottomMarkedText, picture }: BenefitItemProps,
) => {
  const altAndTitleValue = topMarkedText + " " + bottomText + " " +
    bottomMarkedText;
  return (
    <div className="flex-col md:flex-row flex items-center gap-3">
      <Image
        src={picture!}
        loading="lazy"
        height={20}
        width={18}
        alt={altAndTitleValue}
        title={altAndTitleValue}
      />
      <p className="text-center max-[768px]:text-[10px] md:text-left font-bold text-md text-white">
        {topMarkedText}
        <br />
        <span className="font-light">
          {bottomText}
        </span>{" "}
        {bottomMarkedText}
      </p>
    </div>
  );
};

const BenefitBar = ({
  startItem = {
    topMarkedText: "FRETE GRÁTIS",
    bottomText: "ACIMA DE",
    bottomMarkedText: "R$299",
  },
  midItem = {
    topMarkedText: "EM ATÉ 10X",
    bottomText: "S/JUROS",
    bottomMarkedText: "NO CARTÃO",
  },
  endItem = {
    topMarkedText: "OFERTAS COM ATÉ",
    bottomText: "60% DE DESCONTO",
    bottomMarkedText: "NA BF23",
    // image: "/freightIcon.png",
  },
}: Props) => {
  return (
    <>
      <div className="hidden md:flex w-full gap-4 px-5 h-20 rounded-2xl justify-around md:items-center bg-zinc-800 bg-opacity-50">
        <BenefitItem {...startItem} />
        <BenefitItem {...midItem} />
        <BenefitItem {...endItem} />
      </div>
      <div className="flex md:hidden w-full h-48 gap-4 px-8 flex-col rounded-2xl justify-center items-center bg-zinc-800 bg-opacity-50">
        <div className="flex w-full justify-between">
          <BenefitItem {...startItem} />
          <BenefitItem {...midItem} />
        </div>
        <BenefitItem {...endItem} />
      </div>
    </>
  );
};

export default BenefitBar;
