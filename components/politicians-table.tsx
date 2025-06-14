import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

export default function PoliticiansTable({ politicians }) {
  console.log("Politicians data:", politicians)
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Partido</TableHead>
            <TableHead>Identificador Externo</TableHead>
            <TableHead>Total de despesas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {politicians.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full"
                    src={item.attributes.politician_image_url}
                    width={40}
                    height={40}
                    alt={item.attributes.name}
                  />
                  <div>
                    <div className="font-medium">{item.attributes.name}</div>
                    <span className="text-muted-foreground mt-0.5 text-xs">
                      {item.attributes.cpf}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{item.attributes.party}-{item.attributes.state}</TableCell>
              <TableCell>{item.attributes.external_id}</TableCell>
              <TableCell><Link href={`/politician/${item.id}`}>{Number(item.attributes.expenses_total).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
