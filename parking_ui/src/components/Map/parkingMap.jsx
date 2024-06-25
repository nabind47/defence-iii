import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
// import 'react-leaflet-routing-machine/dist/styles.css';

const ParkingMap = ({ spot, name, id }) => {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const showRouting = (map) => {
    if (userLocation && spot[0]) {
      L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(parseFloat(spot[0].split(',')[0]), parseFloat(spot[0].split(',')[1]))
        ],
        routeWhileDragging: true,
        show: true,
        createMarker: function () {
          return null;
        },
      }).addTo(map);
    }
  };

  const RenderRouting = () => {
    const map = useMap();
    showRouting(map);
    return null;
  };

  return (
    <div className='h-96 w-half overflow-hidden object-contain z-10'>
      {spot[0] && (
        <MapContainer center={userLocation || spot[0].split(',')} zoom={15} className="w-half h-96" ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">PPV</a> contributors'
          />

          <Marker key={id} position={spot[0].split(',')}>
            <Popup>{name}</Popup>
          </Marker>

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          <RenderRouting />
        </MapContainer>
      )}
    </div>
  );
};

export default ParkingMap;
