import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <Container className="py-10 text-center text-gray-500">

        <div className="font-semibold text-lg text-blue-600 mb-2">
          Booky
        </div>

        <p className="text-sm">
          Discover amazing books & elevate knowledge, ready to become smarter.
        </p>

        <div className="mt-4 text-sm">
          Follow on Social Media
        </div>

      </Container>
    </footer>
  );
}