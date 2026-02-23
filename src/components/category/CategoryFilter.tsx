import { useNavigate, useParams } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
};

export default function CategoryFilter({
  categories,
  selectedRating,
  onRatingChange,
}: Props) {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const activeCategoryId = Number(categoryId);

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="w-64 shrink-0 pr-6 border-r border-gray-200">

      {/* FILTER TITLE */}
      <div className="font-semibold text-lg mb-6">
        FILTER
      </div>

      {/* CATEGORY SECTION */}
      <div className="mb-8">

        <div className="font-semibold mb-3">
          Category
        </div>

        <div className="space-y-2">
          {categories.map((category) => {
            const checked = category.id === activeCategoryId;

            return (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    navigate(`/category/${category.id}`)
                  }
                />

                <span>{category.name}</span>
              </label>
            );
          })}
        </div>

      </div>

      {/* RATING SECTION */}
      <div>

        <div className="font-semibold mb-3">
          Rating
        </div>

        <div className="space-y-2">
          {ratings.map((rating) => {
            const checked = selectedRating === rating;

            return (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onRatingChange(
                      checked ? null : rating
                    )
                  }
                />

                <span className="text-yellow-500">
                  ★
                </span>

                <span>{rating}</span>
              </label>
            );
          })}
        </div>

      </div>

    </div>
  );
}