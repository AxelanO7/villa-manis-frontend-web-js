import React, { Children } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

interface BaseLayoutProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  withSidebar?: boolean;
}

export default function BaseLayout({
  children,
  withNavbar = true,
  withSidebar = true,
}: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex w-full">
        {withSidebar && <Sidebar />}
        <div className="grow">
          {withNavbar && <Navbar />}
          <div className="h-20" />
          <div className="flex">
            <div className="w-12" />
            <div className="flex flex-col w-full min-h-screen">
              <div className="grow">{children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
