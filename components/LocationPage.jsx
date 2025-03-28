"use client"
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Leaflet to customize the marker
import axios from "axios";

const LocationPage = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the code only runs in the browser
    setIsClient(true);

    // Get the user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          await getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // Reverse geocode the coordinates using Nominatim API (OpenStreetMap)
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const address = response.data.address;
      setAddress(address);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching address", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!location) {
    return <div>Could not fetch location</div>;
  }

  // Return null or a fallback if it's server-side rendering
  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: "49vh" }}>
      {address && (
        <div>
          <h2>Your Address:</h2>
          <p>
            {address.road}, {address.city}, {address.state}, {address.country}
          </p>
        </div>
      )}

      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[location.lat, location.lng]}
          icon={new L.Icon({
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
        >
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationPage;
