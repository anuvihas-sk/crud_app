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
import { Home, Plus } from "lucide-react"

export default function HomePage() {
  const [items, setItems] = useState<PricingItem[]>([])
  const [editing, setEditing] = useState<PricingItem | undefined>()
  const [isFormOpen, setIsFormOpen] = useState(false)

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
    setIsFormOpen(false)
    fetchData()
  }

  const handleDelete = async (id: string) => {
    await deletePricing(id)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openAddForm = () => {
    setEditing(undefined)
    setIsFormOpen(true)
  }

  const openEditForm = (item: PricingItem) => {
    setEditing(item)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditing(undefined)
    setIsFormOpen(false)
  }

  return (
    <>
      <header className="bg-blue-600 text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <Home size={24} />
          <h1 className="text-xl font-semibold">Pricing</h1>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
        >
          <Plus size={16} />
          <span>Add Procedure</span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto py-6">
        <PricingTable items={items} onEdit={openEditForm} onDelete={handleDelete} />
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <button
              onClick={closeForm}
              className="mb-4 text-gray-500 hover:text-gray-700"
              aria-label="Close form"
            >
              ✕
            </button>
            <PricingForm initialData={editing} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  )
}
