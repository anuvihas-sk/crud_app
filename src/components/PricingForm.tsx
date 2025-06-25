"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ObjectSchema } from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PricingItem } from "@/types/pricing";
import { Plus } from "lucide-react";

const schema: ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Name is required"),
  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .positive("Base price must be positive")
    .required("Base price is required"),
  tax: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue)
    )
    .typeError("Tax must be a number")
    .min(0, "Tax must be at least 0%")
    .max(100, "Tax cannot exceed 100%")
    .required("Tax is required"),
  note: yup.string().nullable().notRequired(),
});

interface FormData {
  name: string;
  basePrice: number;
  tax: number;
  note?: string | null | undefined;
}

type Props = {
  initialData?: PricingItem;
  onSubmit: (data: Omit<PricingItem, "id">) => void;
};

export default function PricingForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        basePrice: initialData.basePrice,
        tax: initialData.tax,
        note: initialData.note ?? null,
      });
    } else {
      reset({ name: "", basePrice: 0, tax: 0, note: null });
    }
  }, [initialData, reset]);

  const basePrice = watch("basePrice") ?? 0;
  const tax = watch("tax") ?? 0;
  const totalPrice = Number(basePrice) + Number(basePrice) * (Number(tax) / 100);

  const handleFormSubmit = (data: FormData) => {
    const formattedData: Omit<PricingItem, "id"> = {
      name: data.name,
      basePrice: data.basePrice,
      tax: data.tax,
      note: data.note ?? undefined, 
      totalPrice: Number(totalPrice.toFixed(2)),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex space-x-4 mb-4">
        <select
          {...register("name")}
          className="border border-gray-300 rounded px-3 py-2 w-56"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Procedure Name
          </option>
          <option value="Procedure A">Procedure A</option>
          <option value="Procedure B">Procedure B</option>
          <option value="Procedure C">Procedure C</option>
        </select>

        <Input
          type="number"
          step="any"
          placeholder="Price"
          {...register("basePrice")}
          className="w-28"
          required
        />

        <select
          {...register("tax")}
          className="border border-gray-300 rounded px-3 py-2 w-32"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Tax*
          </option>
          <option value={0}>0%</option>
          <option value={5}>5%</option>
          <option value={12}>12%</option>
          <option value={18}>18%</option>
          <option value={28}>28%</option>
        </select>

        <Input
          type="number"
          placeholder="Total amount (INR)"
          value={totalPrice.toFixed(2)}
          readOnly
          disabled
          className="w-44"
        />

        <Input
          placeholder="Notes"
          {...register("note")}
          className="w-56"
        />
      </div>

      <Button
        variant="ghost"
        size="sm"
        type="submit"
        className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center space-x-1"
      >
        <Plus size={16} />
        <span>Add Procedure</span>
      </Button>
    </form>
  );
}
