"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { PricingItem } from "@/types/pricing"

const schema = yup.object({
  name: yup.string().required("Name is required"),
  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .positive("Base price must be positive")
    .required("Base price is required"),
  tax: yup
    .number()
    .typeError("Tax must be a number")
    .min(0, "Tax must be at least 0%")
    .max(100, "Tax cannot exceed 100%")
    .required("Tax is required"),
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
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
    else{
      reset({name:""})
    }
  }, [initialData, reset])

  const basePrice = watch("basePrice") ?? 0
  const tax = watch("tax") ?? 0

  const totalPrice = Number(basePrice) + Number(basePrice) * (Number(tax) / 100)

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, totalPrice: Number(totalPrice.toFixed(2)) })
      )}
      className="space-y-4"
    >
      <Input placeholder="Name" {...register("name")} />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>

      <Input type="number" step="any" placeholder="Base Price" {...register("basePrice")} />
      <p className="text-red-500 text-sm">{errors.basePrice?.message}</p>

      <Input type="number" step="any" placeholder="Tax (%)" {...register("tax")} />
      <p className="text-red-500 text-sm">{errors.tax?.message}</p>

      <Input value={totalPrice.toFixed(2)} readOnly disabled />
      <p className="text-gray-500 text-sm">Total Price (incl. tax)</p>

      <Button type="submit">{initialData ? "Update" : "Add"} Pricing</Button>
    </form>
  )
}
