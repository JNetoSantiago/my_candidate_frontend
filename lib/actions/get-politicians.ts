export async function getPoliticians() {
  const res = await fetch('http://localhost:3000/api/v1/politicians')

  if (!res.ok) {
    throw new Error('Failed to fetch politicians')
  }

  const response = await res.json()
  return response.data
}