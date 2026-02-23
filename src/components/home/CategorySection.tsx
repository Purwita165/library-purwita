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

      <h2 className="text-xl font-semibold mb-4">
        Categories
      </h2>


      <div className="flex flex-cols-6 w-24 gap-8 ">

        {/* ALL CATEGORY BUTTON */}

        <button

          onClick={() => {
            onCategoryChange(null);
            navigate("/dashboard");
          }}

          className={`
            flex flex-col items-center
            min-w-[100px]
            p-3
            rounded-xl
            transition
            ${
              activeCategoryId === null
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }
          `}
        >

          <div className="text-2xl">📚</div>

          <div className="text-sm mt-1">
            All
          </div>

        </button>



        {/* CATEGORY LIST */}

        {categories.map((category) => {

          const isActive = category.id === activeCategoryId;

          return (

            <button

              key={category.id}

              onClick={() => {

                // update dashboard state
                onCategoryChange(category.id);

                // navigate to category page
                navigate(`/category/${category.id}`);

              }}

              className={`
                flex flex-col items-center
                min-w-[100px]
                p-3
                rounded-xl
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >

              <div className="text-2xl">
                {getCategoryIcon(category.name)}
              </div>

              <div className="text-sm mt-1">
                {category.name}
              </div>

            </button>

          );

        })}


      </div>


    </Container>

  );

}