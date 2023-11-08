type TextType = {
  text: string;
  markedText?: string;
};

type Subtitle = {
  largerText: TextType;
  smallerText: TextType;
};

export interface Props {
  /** @description subtitle below the logo*/
  discount?: string;
  /** @description black friday description*/
  description?: string;
  /** @description subtitle below the description*/
  subtitle?: Subtitle;
}

const BlackFridayDescription = ({
  discount = "60%",
  description =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui justo,
  finibus nec lectus at, laoreet malesuada nibh. Suspendisse gravida
  eleifend lorem ac hendrerit. Cras et quam a ipsum commodo sollicitudin.
  Morbi volutpat convallis est, eget malesuada.`,
  subtitle = {
    largerText: {
      text: "CLIENTE",
      markedText: "VIP",
    },
    smallerText: {
      text: "ACESSO ANTECIPADO EXCLUSIVO",
    },
  },
}: Props) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div>
        <h1 className="text-[70px] leading-[80px] mb-8 md:leading-[100px] uppercase line text-white font-extrabold md:text-[120px]">
          Black
          <span className="font-light block translate-x-6 md:translate-x-24">
            Friday
          </span>
        </h1>
      </div>
      {/* <img className="mb-5" src="/blackFriday.png" height="10vw" alt="" /> */}
      <p className="text-white whitespace-nowrap text-xl sm:text-2xl font-extralight tracking-[0.2em] mb-5">
        ATÉ <span className="font-bold">{discount}</span> DE DESCONTO
      </p>
      <p className="text-xs leading-5 text-center md:text-left sm:text-base text-gray-100 w-full md:w-[40vw] font-extralight">
        {description}
      </p>
      <div className="text-center mt-11">
        <p className="text-white my-2 2xl:text-6xl xl:text-5xl  md:text-4xl sm:text-3xl text-2xl font-bold tracking-[0.4em]">
          {subtitle.largerText.text}{" "}
          <span className="text-red-800">{subtitle.largerText.markedText}</span>
        </p>
        <p className="text-white 2xl:text-2xl xl:text-xl md:text-lg font-medium tracking-[0.1em]">
          {subtitle.smallerText.text}
        </p>
      </div>
    </div>
  );
};

export default BlackFridayDescription;
