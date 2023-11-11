import React from "react";

export default function Footer() {
  return (
    <div className="flex w-full bg-white py-2 px-8">
      <p className="flex items-center">
        Developer by:
        <div className="bg-success px-2 text-white mx-2 rounded">
          <p>Gilang</p>
        </div>
        &copy; 2023
      </p>
      {/* <div className="flex-grow" />
      <p className="flex items-center text-slate-500">
        Page rendered in
        <p className="font-semibold mx-1">0.0207</p>
        seconds.
      </p> */}
    </div>
  );
}
