interface BookCardProps {
  title: string;
  author: string;
  rating: number;
  image: string;
}

export default function BookCard({
  title,
  author,
  rating,
  image,
}: BookCardProps) {
  return (
    <div
      className="
        w-[160px]
        cursor-pointer
        hover:scale-105
        transition
      "
    >
      <img
        src={image}
        alt={title}
        className="
          w-[160px]
          h-[220px]
          object-cover
          rounded-xl
        "
      />

      <div className="mt-2">

        <div className="text-sm font-semibold text-gray-900">
          {title}
        </div>

        <div className="text-xs text-gray-500">
          {author}
        </div>

        <div className="text-xs text-yellow-500 mt-1">
          ★ {rating}
        </div>

      </div>
    </div>
  );
}