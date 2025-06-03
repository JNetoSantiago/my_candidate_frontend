'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

interface Expense {
  id: string
  type: string
  attributes: {
    description: string
    supplier_name: string
    issue_date: string
    amount: number
    document_url: string
  }
}

interface Meta {
  current_page: number
  total_pages: number
  total_count: number
}

export default function PoliticianExpenses({
  expenses,
  meta,
  politicianId,
}: {
  expenses: Expense[]
  meta: Meta
  politicianId: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    router.push(`/politician/${politicianId}?page=${page}`)
  }

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((item) => {
            const expense = item.attributes
            return (
              <TableRow key={item.id}>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.supplier_name}</TableCell>
                <TableCell>
                  {new Date(expense.issue_date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {Number(expense.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {expense.document_url ? (
                    <a
                      href={expense.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      PDF
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent className="flex gap-2">
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => goToPage(1)}
                disabled={meta.current_page === 1}
              >
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => goToPage(meta.current_page - 1)}
                disabled={meta.current_page === 1}
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className="px-4 py-2 text-sm">
                Página {meta.current_page} de {meta.total_pages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => goToPage(meta.current_page + 1)}
                disabled={meta.current_page === meta.total_pages}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => goToPage(meta.total_pages)}
                disabled={meta.current_page === meta.total_pages}
              >
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
