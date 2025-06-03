'use server'

export async function fetchDashboardStats() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${baseUrl}/api/v1/dashboard_stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Erro ao buscar estatísticas do dashboard')
    return null
  }

  const data = await res.json()
  return data
}