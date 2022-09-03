interface TagProps {
  name: string;
  className: string;
}
const Tag = ({ name, className }: TagProps) => {
  return (
    <button className={`${className} transition-ease hover:text-black hover:border-black hover:bg-solana w-auto py-2 text-xl font-bold text-center border-4 border-solana rounded-md text-solana`}>
      {name}
    </button>
  );
};

export default Tag;
