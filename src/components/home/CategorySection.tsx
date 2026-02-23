import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";


type Category = {
  id: number;
  name: string;
};


type CategorySectionProps = {
  activeCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
};


// ============================
// ICON MAPPING
// ============================

const categoryIcons: Record<string, string> = {
  fiksi: "📖",
  lifestyle: "🌿",
  religious: "🕌",
  "self-help": "🧠",
  technology: "💻",
};


function getCategoryIcon(name: string) {
  return categoryIcons[name.toLowerCase()] || "📚";
}



// ============================
// COMPONENT
// ============================

export default function CategorySection({
  activeCategoryId,
  onCategoryChange,
}: CategorySectionProps) {

  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


  // ============================
  // FETCH CATEGORIES
  // ============================

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const response = await fetch(
          "https://library-backend-production-b9cf.up.railway.app/api/categories"
        );

        const json = await response.json();

        setCategories(json.data.categories);

      } catch (error) {

        console.error("Failed to fetch categories:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchCategories();

  }, []);



  // ============================
  // LOADING STATE
  // ============================

  if (loading) {
    return (
      <Container className="mt-8">
        <p>Loading categories...</p>
      </Container>
    );
  }



  // ============================
  // RENDER
  // ============================

  return (
  <Container className="mt-8">

    <h2 className="text-xl font-semibold mb-6">
      Categories
    </h2>

    <div
      className="
        grid
        grid-cols-3
        sm:grid-cols-4
        md:grid-cols-5
        lg:grid-cols-6
        gap-4
      "
    >

      {/* ===================== */}
      {/* ALL CATEGORY BUTTON */}
      {/* ===================== */}

      <button
        onClick={() => {
          onCategoryChange(null);
          navigate("/dashboard");
        }}
        className={`
          flex flex-col items-center justify-center
          h-[120px]
          rounded-xl
          transition
          text-center
          ${
            activeCategoryId === null
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100"
          }
        `}
      >
        <div className="text-2xl">📚</div>
        <div className="text-sm mt-2 font-medium">
          All
        </div>
      </button>

      {/* ===================== */}
      {/* CATEGORY LIST */}
      {/* ===================== */}

      {categories.map((category) => {

        const isActive = category.id === activeCategoryId;

        return (
          <button
            key={category.id}
            onClick={() => {
              onCategoryChange(category.id);
              navigate(`/category/${category.id}`);
            }}
            className={`
              flex flex-col items-center justify-center
              h-[120px]
              rounded-xl
              transition
              text-center
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }
            `}
          >
            <div className="text-2xl">
              {getCategoryIcon(category.name)}
            </div>

            <div className="text-sm mt-2 font-medium px-2">
              {category.name}
            </div>
          </button>
        );

      })}

    </div>

  </Container>
);

}