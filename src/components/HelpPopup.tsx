"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

export default function HelpPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-96 max-w-full h-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Pricing</h2>
        <p className="mb-4">
          To use Pricing Feature, Click <strong>Pricing</strong> from settings Menu.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            It shows procedure details and you are allowed to view, add, edit and delete the procedure and its pricing details
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">1. Add Procedure details</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>You are allowed to view all pricing procedure details.</li>
          <li>
            You can add new procedure by clicking <button className="inline-flex items-center space-x-1 text-blue-600 font-semibold"><Plus size={16} /> <span>Add procedure</span></button>.
          </li>
          <li>
            You can add Procedure name, cost, Tax type, Total amount and Notes. You are allowed to add more procedure name on that popup screen also by clicking <button className="inline-flex items-center space-x-1 text-blue-600 font-semibold"><Plus size={16} /> <span>Add procedure</span></button>.
          </li>
          <li>Click <strong>Save</strong> button to save the Procedure pricing.</li>
          <li>Click <strong>Cancel</strong> button to cancel the Procedure pricing.</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">2. View Procedure</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            You can view the procedure details by clicking <strong>View Icon</strong> button and a popup screen with the pricing details were shown.
          </li>
          <li className="flex items-center space-x-2">
            <Eye size={20} className="text-blue-600" />
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">3. Edit Procedure</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>You are allowed to edit the Procedure details by clicking <strong>Edit Icon</strong> button.</li>
          <li>You should enter the procedure Name, Cost as mandatory field to add procedure and enter other details.</li>
          <li>Click <strong>Save</strong> button to save the Procedure pricing.</li>
          <li className="flex items-center space-x-2">
            <Edit size={20} className="text-blue-600" />
          </li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">4. Delete Procedure</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            If you have to delete any procedure, click <strong>Delete Icon</strong> button and a popup screen will appear.
          </li>
          <li>Click <strong>Yes</strong> button to delete the details.</li>
          <li>Click <strong>No</strong> button to cancel the delete.</li>
          <li className="flex items-center space-x-2">
            <Trash2 size={20} className="text-red-600" />
          </li>
        </ul>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
