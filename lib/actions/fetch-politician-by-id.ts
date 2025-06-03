export async function getPolitician(id: string, page: number = 1) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${baseUrl}/api/v1/politicians/${id}?page=${page}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch politician')
  }

  const response = await res.json()
  return response
}
