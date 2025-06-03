export async function getPoliticians() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${baseUrl}/api/v1/politicians`)

  if (!res.ok) {
    throw new Error('Failed to fetch politicians')
  }

  const response = await res.json()
  return response.data
}