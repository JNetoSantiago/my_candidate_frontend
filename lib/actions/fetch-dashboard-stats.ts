'use server'

export async function fetchDashboardStats() {
  const res = await fetch('http://localhost:3000/api/v1/dashboard_stats', {
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