"use client"

import { useEffect, useState } from "react"
import PricingForm from "@/components/PricingForm"
import PricingTable from "@/components/PricingTable"
import {
  getPricing,
  addPricing,
  updatePricing,
  deletePricing,
} from "@/lib/api"
import { PricingItem } from "@/types/pricing"

export default function HomePage() {
  const [items, setItems] = useState<PricingItem[]>([])
  const [editing, setEditing] = useState<PricingItem | undefined>()

  const fetchData = async () => {
    const res = await getPricing()
    setItems(res.data)
  }

  const handleSubmit = async (data: Omit<PricingItem, "id">) => {
    if (editing) {
      await updatePricing(editing.id, data)
      setEditing(undefined)
    } else {
      await addPricing(data)
    }
    fetchData()
  }

  const handleDelete = async (id: string) => {
    await deletePricing(id)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="max-w-4xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-bold">CRUD APPLICATION</h1>
      <PricingForm initialData={editing} onSubmit={handleSubmit} />
      <PricingTable items={items} onEdit={setEditing} onDelete={handleDelete} />
    </main>
  )
}