import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalHeaderProps {
  children: ReactNode;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

export function Modal({ isOpen, children }: ModalProps) {
  return (
    <>
      {isOpen && (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-full">
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
      <h3 className="text-md text-gray-600 font-medium">{children}</h3>
    </div>
  );
}

export function ModalBody({ children }: ModalBodyProps) {
  return <div className="relative p-6 flex-auto">{children}</div>;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b">
      {children}
    </div>
  );
}
