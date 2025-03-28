"use client"; 

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS to avoid style issues
import { useState } from "react";
import L from "leaflet";

// Define a custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CustomerMap = () => {
  const [customers] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, San Francisco, CA",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Broadway, New York, NY",
      latitude: 40.7128,
      longitude: -74.0060,
    },
  ]);

  return (
    <div className="w-full h-[49vh] rounded-lg shadow-lg border bg-white">
      <MapContainer
        center={[37.7749, -122.4194]} // Initial map center (San Francisco)
        zoom={4}
        className="w-full h-full rounded-lg"
      >
        {/* Mapbox with OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Markers for each customer */}
        {customers.map((customer) => (
          <Marker
            key={customer.id}
            position={[customer.latitude, customer.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{customer.name}</p>
                <p className="text-gray-600">{customer.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CustomerMap;
