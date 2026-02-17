import Container from "./Container";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <Container className="flex items-center justify-between h-[72px]">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Booky"
            className="w-[32px] h-[32px]"
          />
          <span className="text-[20px] font-semibold text-gray-900">
            Booky
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-[500px] mx-8">
          <input
            type="text"
            placeholder="Search books..."
            className="
              w-full
              h-[44px]
              px-4
              border
              border-gray-300
              rounded-xl
              outline-none
              focus:border-blue-500
            "
          />
        </div>

        {/* User */}
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] bg-gray-200 rounded-full" />
        </div>

      </Container>
    </header>
  );
}