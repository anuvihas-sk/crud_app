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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-4">
              <h2 className="text-lg font-semibold text-white">{editing ? "Edit Procedure" : "Add Procedure"}</h2>
              <button
                onClick={closeForm}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <PricingForm initialData={editing} onSubmit={handleSubmit} />
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={closeForm}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
