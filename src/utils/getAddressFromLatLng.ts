import axios from 'axios';

export interface AddressResult {
  formatted_address: string;
  address_components: any[];
}

export const getAddressFromLatLng = async (lat: number, lng: number): Promise<AddressResult> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
    );

    const { formatted_address, address_components } = response.data.results[0];
    return { formatted_address, address_components };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
