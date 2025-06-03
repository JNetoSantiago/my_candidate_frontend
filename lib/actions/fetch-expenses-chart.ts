'use server'

export async function fetchExpensesChart() {
  const res = await fetch('http://localhost:3000/api/v1/expenses_by_day', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('Erro ao buscar dados do gráfico')
    return []
  }

  const data = await res.json()
  return data
}
