import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PricingItem } from "@/types/pricing"
import { Trash2, Edit2 } from "lucide-react"

type Props = {
  items: PricingItem[]
  onEdit: (item: PricingItem) => void
  onDelete: (id: string) => void
}

export default function PricingTable({ items, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader className="bg-blue-200">
        <TableRow>
          <TableHead>Procedure</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Price incl taxes (INR)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="max-w-xs truncate">{item.name}</TableCell>
            <TableCell>{item.note || "Notes"}</TableCell>
            <TableCell>₹ {item.totalPrice.toFixed(2)}</TableCell>
            <TableCell className="space-x-2 flex">
              <button
                onClick={() => onEdit(item)}
                className="p-2 rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition"
                aria-label="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
