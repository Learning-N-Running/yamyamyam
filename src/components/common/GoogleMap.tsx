import React, { useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%", // 지도 높이 설정
};

const center = {
  lat: 37.5665, // 초기 중심 좌표 (예: 서울)
  lng: 126.978,
};

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Marker 추가 */}
        <Marker position={{ lat: 37.5665, lng: 126.978 }} />
        {/* 다른 Marker 추가 가능 */}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(GoogleMapComponent);
