import axios from 'axios';

interface Location {
  lat: number;
  lng: number;
}

export const getLatLngFromAddress = async (address: string): Promise<Location | null> => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${
      process.env.REACT_APP_GOOGLE_API_KEY
    }`;
    const response = await axios.get(url);
    const data = response.data;
    const location = data.results[0]?.geometry.location;
    const latitude = location?.lat;
    const longitude = location?.lng;
    return { lat: latitude, lng: longitude };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
