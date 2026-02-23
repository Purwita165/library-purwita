import { useEffect, useState } from "react"
import Container from "../layout/Container"
import AuthorCard from "../author/AuthorCard"
import { getPopularAuthors, Author } from "../../services/authorService"

export default function PopularAuthorsSection() {

  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const data = await getPopularAuthors()
      setAuthors(data)
    } catch (error) {
      console.error("Failed to fetch authors:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container className="mt-10">
        Loading authors...
      </Container>
    )
  }

  return (
    <Container className="mt-16">

      <h2 className="text-xl font-semibold mb-6">
        Popular Authors
      </h2>

      <div className="flex gap-10 flex-wrap">

        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            name={author.name}
            bookCount={author.bookCount}
          />
        ))}

      </div>

    </Container>
  )
}