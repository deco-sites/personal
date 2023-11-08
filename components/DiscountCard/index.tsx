export interface Props {
  /** @description category name*/
  category: string;
  /** @description percentual discount*/
  discount: number;
  /** @description link to category*/
  link: string;
}

const DiscountCard = ({ category, discount, link }: Props) => {
  return (
    <div className="flex flex-col items-center text-sm font-semibold h-48 w-full justify-center p-4 rounded-lg bg-red-900 text-white gap-4 text-center">
      <span>{category}</span>
      <div className="text-center text-lg ">
        <span>ATÉ</span>
        <br />
        <span className="text-2xl font-bold">
          {discount}% OFF
        </span>
      </div>
      <a
        className="underline text-md tracking-widest"
        href={link}
      >
        APROVEITE
      </a>
    </div>
  );
};

export default DiscountCard;
