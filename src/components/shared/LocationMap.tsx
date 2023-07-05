import styled from 'styled-components';
import React, { useEffect } from 'react';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

interface sizeProps {
  width: string;
  height: string;
}

export default function LocationMap({ latitude, longitude, width, height }: LocationMapProps & sizeProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = async () => {
      await window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

        const imageSrc = 'marker.png';
        const imageOption = { offset: new window.kakao.maps.Point(27, 64) };
        const imageSize = new window.kakao.maps.Size(64, 64);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <MapContainer id="map" width={width} height={height}></MapContainer>;
}

const MapContainer = styled.div<sizeProps>`
  ${({ width, height }) => `width: ${width}; height: ${height};`};
  border-radius: 20px;
`;
