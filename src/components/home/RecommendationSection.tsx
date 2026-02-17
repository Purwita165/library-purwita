import Container from "../layout/Container";
import BookCard from "../book/BookCard";

export default function RecommendationSection() {
  return (
    <Container className="mt-10">

      <h2 className="text-xl font-semibold mb-4">
        Recommendation
      </h2>

      <div className="flex gap-6 flex-wrap">

        <BookCard
          title="Book Name"
          author="Author name"
          rating={4.9}
          image="/book1.jpg"
        />

        <BookCard
          title="Book Name"
          author="Author name"
          rating={4.8}
          image="/book2.jpg"
        />

        <BookCard
          title="Book Name"
          author="Author name"
          rating={4.7}
          image="/book3.jpg"
        />

      </div>

    </Container>
  );
}