import Container from "../layout/Container";

export default function WelcomeBanner() {
  return (
    <Container className="mt-6">
      <div className="w-full rounded-2xl overflow-hidden bg-[#1C65DA]">

        <img
          src="/banner.svg"
          alt="Welcome to Booky"
          className="
            w-full
            h-[180px] md:h-[260px]
            object-contain
            md:object-cover
          "
        />

      </div>
    </Container>
  );
}