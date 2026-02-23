interface AuthorCardProps {
  name: string
  bookCount: number
}

export default function AuthorCard({ name, bookCount }: AuthorCardProps) {
  return (
    <div className="flex items-center gap-3">
      {/* avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400" />

      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-gray-500">
          {bookCount} books
        </p>
      </div>
    </div>
  )
}