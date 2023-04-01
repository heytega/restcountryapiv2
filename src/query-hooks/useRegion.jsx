import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRegionalCountries = (regionName) =>
  axios
    .get(`https://restcountries.com/v3.1/region/${regionName}`)
    .then((response) => response.data);

// export default useRegion(){
//  return useQuery({
//   queryKey: ['Region']
//  })
// }
