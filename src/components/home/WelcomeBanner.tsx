import Container from "../layout/Container";

export default function WelcomeBanner() {
  return (
    <Container className="mt-6">
      <div
        className="
          w-full
          h-[180px]
          rounded-2xl
          bg-gradient-to-r
          from-[#1C65DA]
          to-[#1A87D7]
          flex
          items-center
          justify-between
          px-8
          text-white
        "
      >
        <div>
          <h1 className="text-[28px] font-semibold">
            Welcome to Booky
          </h1>
          <p className="mt-2 text-white/80">
            Discover your next favorite book
          </p>
        </div>

        <img
          src="/banner.svg"
          alt="banner"
          className="h-[140px]"
        />
      </div>
    </Container>
  );
}