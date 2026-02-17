interface AuthorCardProps {
  name: string;
  books: number;
  image: string;
}

export default function AuthorCard({
  name,
  books,
  image,
}: AuthorCardProps) {
  return (
    <div className="flex items-center gap-3">

      <img
        src={image}
        alt={name}
        className="w-[48px] h-[48px] rounded-full"
      />

      <div>
        <div className="font-semibold text-sm">
          {name}
        </div>

        <div className="text-xs text-gray-500">
          {books} books
        </div>
      </div>

    </div>
  );
}