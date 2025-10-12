type TitleCardProps = {
  title: string;
};

export default function TitleCard({ title }: TitleCardProps) {
  return <h3 className="font-bold text-2xl mt-8 text-black">{title}</h3>;
}
