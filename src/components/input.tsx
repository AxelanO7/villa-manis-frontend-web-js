import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, type, value, onChange }: InputProps) {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor={label} className="text-gray-600 text-sm font-medium">
        {label}
      </label>
      <div className="h-1" />
      <input
        type={type}
        className="form-control border rounded px-2 py-1 bg-white"
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
