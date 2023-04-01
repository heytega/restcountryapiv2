import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCountries = () =>
  axios
    .get('https://restcountries.com/v3.1/all')
    .then((response) => response.data);

export default function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
  });
}
