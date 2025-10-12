type CardInfoProps = {
  color: string;
  info: string;
};

export default function CardInfo({ color = "#0000", info }: CardInfoProps) {
  return (
    <div className="flex justify-center items-center">
      <span className="font-bold items-center" style={{ color: color }}>
        {info}
      </span>
    </div>
  );
}
