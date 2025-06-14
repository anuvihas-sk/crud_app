import axios from "axios"
import { PricingItem } from "@/types/pricing"

const API_URL = "https://684c41e5ed2578be881e42a8.mockapi.io/crud"

export const getPricing = () => axios.get<PricingItem[]>(API_URL)
export const addPricing = (item: Omit<PricingItem, "id">) => axios.post(API_URL, item)
export const updatePricing = (id: string, item: Omit<PricingItem, "id">) => axios.put(`${API_URL}/${id}`, item)
export const deletePricing = (id: string) => axios.delete(`${API_URL}/${id}`)
