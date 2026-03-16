import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {  LatLngExpression } from "leaflet";
import "./VacationMap.css"
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";


L.Icon.Default.mergeOptions({iconUrl: markerIcon, shadowUrl:markerShadow});

type Props = {
    destination: string;
}
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
export function VacationMap({ destination}: Props) {
    const [position, setPosition] = useState<LatLngExpression | null>(null);

    useEffect(()=>{
         fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`)
         .then(res => res.json())
         .then(data => {
            if(data.length > 0) {
                setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
            }
         })
         .catch(()=> setPosition([31.7683, 35.2137]))
    },[destination]);
    if(!position) return <p>Loading map...</p>

    return (
        <MapContainer center={position}
            zoom={5}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    {destination}
                </Popup>
            </Marker>
        </MapContainer>
    )
}

