import React from "react";

interface InputProps {
  label?: string;
  type: string;
  value?: string;
  // inputDirection?: "column" | "row";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type,
  value,
  onChange,
}: // inputDirection,
InputProps) {
  return (
    <div className="form-group flex flex-col">
      {label && (
        // inputDirection === "column" &&
        <label
          htmlFor={label}
          className="text-gray-600 text-sm font-medium pb-1"
        >
          {label}
        </label>
      )}
      {/* <div className="flex"> */}
      {/* {label && inputDirection === "row" && (
          <label htmlFor={label} className="text-gray-600 text-sm font-medium">
            {label}
          </label>
        )} */}
      <input
        type={type}
        className="form-control border rounded px-2 py-1 bg-white"
        id={label}
        value={value}
        onChange={onChange}
      />
      {/* </div> */}
    </div>
  );
}
