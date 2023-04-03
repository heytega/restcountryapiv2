import React, { useState, useEffect } from 'react';
import Countries from '../components/Countries';
import Loading from '../components/Loading';
// import { motion } from 'framer-motion';
import {
  Stack,
  InputBase,
  InputLabel,
  MenuItem,
  FormControl,
  Typography,
  Select,
  Container,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import useRegion from '../query-hooks/useRegion';
import { Collections } from '@mui/icons-material';

const allUrl = 'https://restcountries.com/v3.1/all';

// Theme Styling

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.primary.main, 0.008),
  // },
  boxShadow: theme.shadows[2],
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '50px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: '40%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2, 0, 3),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  color: theme.palette.text.primary,
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const Home = ({ loading, setLoading }) => {
  // Data initializations
  const [countries, setCountries] = useState([]);
  const [regionName, setRegionName] = useState('all');
  const [search, setSearch] = useState('');

  // Methods & functions

  const fetchNameData = async (countryName) => {
    console.log(countryName);
    setLoading(true);
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (res.ok) {
        const data = await res.json();
        setCountries(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // METHOD AND FUNCTION

  //useQuery Hook to Fetch the countries data according to region
  const countriesQuery = useRegion(regionName);
  console.log(countriesQuery);

  const handleChange = (e) => {
    setRegionName(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // fetchNameData(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        height: '100vh',
        mt: '72px',
      }}
    >
      <Container
        maxWidth='xl'
        sx={{
          backgroundColor: 'primary.light',
        }}
      >
        <Stack
          sx={{
            pt: 4,
            mb: 6,
          }}
          // component={motion.div}
          direction={{ xxs: 'column', sm: 'row' }}
          spacing={{ xxs: 2 }}
          justifyContent='space-between'
          // initial={{ y: -250 }}
          // animate={{ y: 0 }}
          // transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search for a country…'
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => handleSearch(e)}
            />
          </Search>

          <FormControl
            sx={{
              width: '200px',
              height: '50px',
              border: 'none',
              backgroundColor: 'primary.main',
            }}
          >
            <InputLabel id='demo-simple-select-label'>
              Filter by Region
            </InputLabel>

            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={regionName}
              label='Filter by Region'
              onChange={handleChange}
              sx={{ backgroundColor: 'primary.main' }}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'africa'}>Africa</MenuItem>
              <MenuItem value={'america'}>America</MenuItem>
              <MenuItem value={'asia'}>Asia</MenuItem>
              <MenuItem value={'europe'}>Europe</MenuItem>
              <MenuItem value={'oceania'}>Oceania</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box
        // component={motion.div}
        // initial={{ x: '100vw' }}
        // animate={{ x: 0 }}
        // transition={{ type: 'Spring', delay: 0.5, duration: 1 }}
        >
          {countriesQuery.isLoading && <Loading />}
          {countriesQuery.isError && (
            <Typography>{JSON.stringify(countriesQuery.error)}</Typography>
          )}
          {countriesQuery.isSuccess && <Countries regionName={regionName} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
