export default function Button({ children }: any) {
  return (
    <button
      className="w-[21.5rem] h-[4.4rem] bg-blue-600 rounded-lg border-0 text-white font-bold"
      type="button"
    >
      {children}
    </button>
  );
}
