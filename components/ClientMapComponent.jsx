"use client";

import dynamic from "next/dynamic";

// Dynamically import the CustomerMap with ssr: false
const CustomerMap = dynamic(() => import("./CustomerMap"), { ssr: false });
const LocationPage = dynamic(() => import("./LocationPage"), { ssr: false });

const ClientMapComponent = () => {
  return (
    <div className="w-full h-[500px] rounded-lg shadow-lg border bg-white">
      <CustomerMap />
    <LocationPage />
    </div>
  );
};

export default ClientMapComponent;
