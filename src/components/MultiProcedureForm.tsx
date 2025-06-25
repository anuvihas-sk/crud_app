"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, XCircle } from "lucide-react";
import { PricingItem } from "@/types/pricing";

type ProcedureRow = {
  id: string;
  name: string;
  basePrice: number | "";
  tax: number | "";
  note: string;
  totalPrice: number;
};

type Props = {
  initialData?: PricingItem[];
  onSubmit: (data: Omit<PricingItem, "id">[]) => void;
};

const emptyProcedure = (): ProcedureRow => ({
  id: Math.random().toString(36).substr(2, 9),
  name: "",
  basePrice: "",
  tax: "",
  note: "",
  totalPrice: 0,
});

export default function MultiProcedureForm({ initialData = [], onSubmit }: Props) {
  const [procedures, setProcedures] = useState<ProcedureRow[]>(
    initialData.length > 0
      ? initialData.map((item) => ({
          id: item.id,
          name: item.name,
          basePrice: item.basePrice,
          tax: item.tax,
          note: item.note ?? "",
          totalPrice: item.totalPrice,
        }))
      : [emptyProcedure()]
  );

  const handleAddProcedure = () => {
    setProcedures([...procedures, emptyProcedure()]);
  };

  const handleRemoveProcedure = (id: string) => {
    setProcedures(procedures.filter((proc) => proc.id !== id));
  };

  const handleChange = (
    id: string,
    field: keyof Omit<ProcedureRow, "id" | "totalPrice">,
    value: string | number
  ) => {
    setProcedures((prev) =>
      prev.map((proc) => {
        if (proc.id === id) {
          const updated = { ...proc, [field]: value };
          const basePriceNum = Number(updated.basePrice) || 0;
          const taxNum = Number(updated.tax) || 0;
          updated.totalPrice = Number((basePriceNum + basePriceNum * (taxNum / 100)).toFixed(2));
          return updated;
        }
        return proc;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const proc of procedures) {
      if (!proc.name || proc.basePrice === "" || proc.tax === "") {
        alert("Please fill all required fields in each procedure.");
        return;
      }
    }

    const dataToSubmit = procedures.map(({ id, basePrice, tax, ...rest }) => ({
      basePrice: Number(basePrice),
      tax: Number(tax),
      ...rest,
    }));
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {procedures.map((proc) => (
          <div key={proc.id} className="flex space-x-4 items-center">
            <select
              value={proc.name}
              onChange={(e) => handleChange(proc.id, "name", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-56"
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
              value={proc.basePrice}
              onChange={(e) => handleChange(proc.id, "basePrice", e.target.value)}
              className="w-28"
              required
            />

            <select
              value={proc.tax}
              onChange={(e) => handleChange(proc.id, "tax", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-32"
              required
            >
              <option value="" disabled>
                Tax*
              </option>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>

            <Input
              type="number"
              placeholder="Total amount (INR)"
              value={proc.totalPrice.toFixed(2)}
              readOnly
              disabled
              className="w-44"
            />

            <Input
              placeholder="Notes"
              value={proc.note}
              onChange={(e) => handleChange(proc.id, "note", e.target.value)}
              className="w-56"
            />

            {procedures.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveProcedure(proc.id)}
                className="p-2 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                aria-label="Remove Procedure"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={handleAddProcedure}
          className="flex items-center space-x-1"
        >
          <Plus size={16} />
          <span>Add Procedure</span>
        </Button>
      </div>
    </form>
  );
}
