'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'

interface MapProps {
  lat: number
  lng: number
}

const Map = ({ lat, lng }: MapProps) => {
  return (
    <div className="w-full aspect-[4/3] rounded-md relative overflow-hidden max-h-96 shadow-md z-10">
      <MapContainer zoom={4} center={[lat, lng]} className="size-full flex-1">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]} />
      </MapContainer>
    </div>
  )
}

export default Map
