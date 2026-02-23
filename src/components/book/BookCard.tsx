import { useNavigate } from "react-router-dom";

type BookCardProps = {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
};

export default function BookCard({
  id,
  title,
  author,
  coverImage,
  rating,
}: BookCardProps) {

  const navigate = useNavigate();

  return (
    <div
      className="w-[224px] flex flex-col cursor-pointer hover:opacity-80 transition"
      onClick={() => navigate(`/books/${id}`)}
    >

      {/* Cover */}
      <img
        src={coverImage}
        alt={title}
        className="w-full h-56 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col gap-1 p-4">

        {/* Title */}
        <div className="text-[18px] font-bold text-neutral-900">
          {title}
        </div>

        {/* Author */}
        <div className="text-[16px] text-neutral-700">
          {author}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">

          <span className="text-yellow-500 text-lg">
            ★
          </span>

          <span className="text-[16px] font-semibold">
            {rating}
          </span>

        </div>

      </div>

    </div>
  );
}