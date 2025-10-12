import CardInfo from "./card-info";
import TitleCard from "./title-card";

interface CardProps {
  title: string;
  info: string;
  color: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  info,
  color,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={`w-[30.1rem] h-[18.8rem] bg-white border rounded-[0.6rem] text-center shadow-[0_0.1rem_0.4rem_black] ${
        className || ""
      }`}
    >
      <TitleCard title={title} />

      <CardInfo color={color} info={info} />

      {children}
    </div>
  );
}
