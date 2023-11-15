import React from "react";

interface BreadcrumbProps {
  title?: string;
  items: string[];
  backgroundColor?: string;
  paddingHorizontal?: number;
}

export function Breadcrumb({
  title,
  items,
  backgroundColor = "white",
  paddingHorizontal = 0,
}: BreadcrumbProps) {
  return (
    <div
      className="bg-white w-full"
      style={{ padding: `16px ${paddingHorizontal}px` }}
    >
      <h1 className="text-3xl text-gray-500">{title}</h1>
      <div className="h-4" />
      <div
        className="flex w-full"
        style={{
          backgroundColor: backgroundColor,
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
    </div>
  );
}

// export function LabelBreadcrumb({ children }: LabelBreadcrumbProps) {
//   return (
//     <div className="bg-white w-full px-8 py-4">
//       <h1 className="text-3xl text-gray-500">{children}</h1>
//     </div>
//   );
// }
