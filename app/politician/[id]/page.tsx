import { SiteHeader } from "@/components/site-header"
import { getPolitician } from "@/lib/actions/fetch-politician-by-id"
import PoliticianExpenses from "@/components/politicians-expenses"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function PoliticianPage({ params, searchParams }: {
  params: { id: string },
  searchParams?: { page?: string }
}) {
  const page = searchParams?.page || "1"
  const politician = await getPolitician(params.id, Number(page))

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-4 justify-between md:items-start">
        <div className="flex flex-col md:flex-row p-4 md:p-8 gap-4 items-center md:items-start">
          <div>
            <img
              className="rounded-lg w-40 h-40 object-cover"
              src={politician.data.attributes.politician_image_url}
              alt={politician.data.attributes.name}
            />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-bold">
              {politician.data.attributes.name}
            </h4>
            <p>{politician.data.attributes.cpf}</p>
            <p>{politician.data.attributes.party} - {politician.data.attributes.state}</p>
            <p>ID Externo: {politician.data.attributes.external_id}</p>
          </div>
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription>Maior Despesa</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {politician.data.attributes.largest_expense}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="p-8">
        <h4 className="text-2xl">Despesas</h4>
        <PoliticianExpenses
          expenses={politician.included}
          meta={politician.meta}
          politicianId={params.id}
        />
      </div>
    </div>
  )
}
