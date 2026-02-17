import Container from "../layout/Container";
import AuthorCard from "../author/AuthorCard";

export default function PopularAuthorsSection() {
  return (
    <Container className="mt-12">

      <h2 className="text-xl font-semibold mb-4">
        Popular Authors
      </h2>

      <div className="flex gap-8">

        <AuthorCard
          name="Author name"
          books={5}
          image="/author1.jpg"
        />

        <AuthorCard
          name="Author name"
          books={8}
          image="/author2.jpg"
        />

        <AuthorCard
          name="Author name"
          books={3}
          image="/author3.jpg"
        />

      </div>

    </Container>
  );
}