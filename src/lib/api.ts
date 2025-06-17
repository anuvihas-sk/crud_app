import axios from "axios"
import { PricingItem } from "@/types/pricing"

const API_URL = "https://684c41e5ed2578be881e42a8.mockapi.io/crud"

export const getPricing = () => axios.get<PricingItem[]>(API_URL)

export const addPricing = (item: Omit<PricingItem, "id">) =>
  axios.post(API_URL, item)

export const updatePricing = async (
  id: string,
  item: Omit<PricingItem, "id">
): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, item)
    console.log("Updated successfully")
  } catch (error) {
    console.error("Update failed:", error)
  }
}

export const deletePricing = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`)
    console.log("Deleted successfully")
  } catch (error) {
    console.error("Delete failed:", error)
  }
}
