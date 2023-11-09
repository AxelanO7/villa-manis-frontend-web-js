import React from "react";

interface BreadcrumbProps {
  items: string[];
  backgroundColor?: string;
  paddingHorizontal?: number;
}

export default function Breadcrumb({
  items,
  backgroundColor = "white",
  paddingHorizontal = 0,
}: BreadcrumbProps) {
  return (
    <div
      className="flex w-full"
      style={{
        backgroundColor: backgroundColor,
        padding: `0 ${paddingHorizontal}px`,
      }}
    >
      {items.map((item, index) => {
        return (
          <>
            <p className="text-gray-500">{item}</p>
            {index !== items.length - 1 && (
              <div className="text-gray-500 px-2">/</div>
            )}
          </>
        );
      })}
    </div>
  );
}
