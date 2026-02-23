export interface Author {
  id: number
  name: string
  bio: string | null
  bookCount: number
  accumulatedScore: number
}

export async function getPopularAuthors(): Promise<Author[]> {
  const response = await fetch(
    "https://library-backend-production-b9cf.up.railway.app/api/authors/popular?limit=10"
  )

  const json = await response.json()

  return json.data.authors
}