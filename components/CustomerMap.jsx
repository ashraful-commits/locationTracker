// components/CustomerMap.tsx
'use client'; // Required for client-side components in Next.js

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Demo data for Bangladesh locations (Netrokona and surrounding areas)
const demoCustomers = [
  {
    id: 1,
    name: "Abdul Rahman",
    address: "Netrokona Sadar, Netrokona",
    position: [24.8667, 90.7167], // Netrokona coordinates
    orders: 5,
    lastOrder: "2023-05-15"
  },
  {
    id: 2,
    name: "Fatima Begum",
    address: "Mohongonj, Netrokona",
    position: [24.9333, 90.7833], // Mohongonj coordinates
    orders: 3,
    lastOrder: "2023-06-20"
  },
  {
    id: 3,
    name: "Rahim Ali",
    address: "Kendua, Netrokona",
    position: [24.8167, 90.6333], // Kendua coordinates
    orders: 7,
    lastOrder: "2023-04-10"
  },
  {
    id: 4,
    name: "Sultana Akter",
    address: "Durgapur, Netrokona",
    position: [25.0833, 90.6667], // Durgapur coordinates
    orders: 2,
    lastOrder: "2023-07-05"
  },
  {
    id: 5,
    name: "Jamal Uddin",
    address: "Purbadhala, Netrokona",
    position: [24.9167, 90.5667], // Purbadhala coordinates
    orders: 4,
    lastOrder: "2023-06-30"
  }
];

export default function CustomerMap() {
  useEffect(() => {
    // Fix for map rendering in Next.js
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  // Calculate center point (average of all positions)
  const center = demoCustomers.reduce(
    (acc, customer) => {
      return [acc[0] + customer.position[0], acc[1] + customer.position[1]];
    },
    [0, 0]
  ).map(coord => coord / demoCustomers.length) as [number, number];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer Locations in Netrokona, Bangladesh</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Customers: {demoCustomers.length}</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Netrokona District
            </span>
          </div>
        </div>
        
        <div className="h-[500px] w-full relative">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {demoCustomers.map(customer => (
              <Marker key={customer.id} position={customer.position}>
                <Popup>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.address}</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Orders: {customer.orders}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        Last: {customer.lastOrder}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing customers in Netrokona district and surrounding areas
          </p>
        </div>
      </div>
    </div>
  );
}