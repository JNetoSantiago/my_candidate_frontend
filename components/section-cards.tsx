import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatsProps = {
  stats: {
    total_politicians: number
    total_expenses: number
    total_amount: string
    max_expense: {
      amount: string
      description: string
      politician: {
        name: string
        party: string
        state: string
      }
    } | null
  }
}

export function SectionCards({ stats }: StatsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Políticos Cadastrados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.total_politicians}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Com mandato ativo em 2024
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Qtd. de Despesas Cadastradas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.total_expenses}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Despesas referentes a 2024
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Maior Despesa Registrada</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.max_expense?.amount || "-"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {stats.max_expense ? (
            <>
              <div className="line-clamp-1 flex gap-2 font-medium">
                {stats.max_expense.description}
              </div>
              <div className="text-muted-foreground">
                {`${stats.max_expense.politician.name} ${stats.max_expense.politician.party}-${stats.max_expense.politician.state}`}
              </div>
            </>
          ) : (
            <div className="text-muted-foreground">Nenhuma despesa registrada</div>
          )}
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Despesas em 2024</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.total_amount}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
