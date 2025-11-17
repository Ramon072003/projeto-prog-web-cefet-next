interface TitleSectionProps {
  children: React.ReactNode;
}

export default function TitleSection({ children }: TitleSectionProps) {
  return <h1 className="text-5xl font-bold text-black">{children}</h1>;
}
