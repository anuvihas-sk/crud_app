"use client";

import { Home, Plus, HelpCircle } from "lucide-react";

type Props = {
  onAddProcedure: () => void;
};

import { useState } from "react";
import HelpPopup from "./HelpPopup";

export default function Navbar({ onAddProcedure }: Props) {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
  };

  return (
    <>
      <header className="bg-blue-600 text-white flex items-center justify-between px-6 h-16">
        <div className="flex items-center space-x-2">
          <Home size={20} />
          <h1 className="text-base font-semibold leading-6">Pricing</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddProcedure}
            className="flex items-center space-x-2 bg-white hover:bg-gray-100 px-3 py-1 rounded-lg text-blue-600 font-medium border border-blue-600"
          >
            <Plus size={16} className="text-blue-600" />
            <span>Add Procedure</span>
          </button>
          <button
            aria-label="Help"
            onClick={toggleHelp}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white hover:bg-gray-100 text-blue-600 border border-blue-600"
          >
            <HelpCircle size={20} className="text-blue-600" />
          </button>
        </div>
      </header>
      {showHelp && <HelpPopup onClose={toggleHelp} />}
    </>
  );
}
