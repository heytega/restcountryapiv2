import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRegionalCountries = async (regionName) => {
  if (regionName === 'all') {
    return axios
      .get(`https://restcountries.com/v3.1/${regionName}`)
      .then((response) => response.data);
  }
  return axios
    .get(`https://restcountries.com/v3.1/region/${regionName}`)
    .then((response) => response.data);
};

export default function useRegion(regionName) {
  return useQuery({
    queryKey: ['Regions', regionName],
    queryFn: () => fetchRegionalCountries(regionName),
  });
}
