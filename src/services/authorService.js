export async function getPopularAuthors() {
    const response = await fetch("https://library-backend-production-b9cf.up.railway.app/api/authors/popular?limit=10");
    const json = await response.json();
    return json.data.authors;
}
