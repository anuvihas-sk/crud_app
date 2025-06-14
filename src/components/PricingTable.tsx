import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PricingItem } from "@/types/pricing"

type Props = {
  items: PricingItem[]
  onEdit: (item: PricingItem) => void
  onDelete: (id: string) => void
}

export default function PricingTable({ items, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Base</TableHead>
          <TableHead>Tax %</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.basePrice}</TableCell>
            <TableCell>{item.tax}%</TableCell>
            <TableCell>${item.totalPrice}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" onClick={() => onEdit(item)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}