"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { PricingItem } from "@/types/pricing"

const schema = yup.object({
  name: yup.string().required(),
  basePrice: yup.number().positive().required(),
  tax: yup.number().min(0).max(100).required(),
})

type FormData = {
  name: string
  basePrice: number
  tax: number
}

type Props = {
  initialData?: PricingItem
  onSubmit: (data: Omit<PricingItem, "id">) => void
}

export default function PricingForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      basePrice: 0,
      tax: 0,
    },
  })

  useEffect(() => {
    if (initialData) reset(initialData)
  }, [initialData, reset])

  const basePrice = watch("basePrice")
  const tax = watch("tax")
  const totalPrice = basePrice + basePrice * (tax / 100)

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, totalPrice }))} className="space-y-4">
      <Input placeholder="Name" {...register("name")} />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>

      <Input type="number" placeholder="Base Price" {...register("basePrice")} />
      <p className="text-red-500 text-sm">{errors.basePrice?.message}</p>

      <Input type="number" placeholder="Tax (%)" {...register("tax")} />
      <p className="text-red-500 text-sm">{errors.tax?.message}</p>

      <Input value={totalPrice.toFixed(2)} readOnly disabled />

      <Button type="submit">{initialData ? "Update" : "Add"} Pricing</Button>
    </form>
  )
}