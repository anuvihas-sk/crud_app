export interface PricingItem {
  id: string
  name: string
  basePrice: number
  tax: number
  totalPrice: number
  note?: string
}
