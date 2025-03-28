"use client";

import dynamic from "next/dynamic";

// Dynamically import the CustomerMap with ssr: false
const CustomerMap = dynamic(() => import("./CustomerMap"), { ssr: false });
const LocationPage = dynamic(() => import("./LocationPage"), { ssr: false });

const ClientMapComponent = () => { 
  return (
    <div className="w-screen space-y-3 h-screen flex justify-center items-center flex-col  rounded-lg shadow-lg border bg-white">
      <CustomerMap />
    <LocationPage />
    </div>
  );
};

export default ClientMapComponent;
