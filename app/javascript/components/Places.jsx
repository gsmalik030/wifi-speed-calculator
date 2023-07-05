import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import { Container } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPlacesData } from '../redux/places/placesSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Places = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPlacesData())
  },[])

  const [search, setSearch] = useState('')

  const {places, isLoading} = useSelector((store) => store.places)

  function createData(name, city, most_recent_speed, speed_unit, avg_speed) {
    return { name, city, most_recent_speed, speed_unit, avg_speed };
  }

  const rows = places.map((place) => createData(
    place.name,
    place.city,
    place.most_recent_speed,
    place.speed_unit,
    place.avg_speed
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant='h4' component= "h2">
                Wifi Speed Tracker
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: '15px' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button variant="contained" color="success">
        New Test
        </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    <Container>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
        <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="right">City</StyledTableCell>
          <StyledTableCell align="right">Recent Speed</StyledTableCell>
          <StyledTableCell align="right">Unit</StyledTableCell>
          <StyledTableCell align="right">Average</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="right">{row.city}</StyledTableCell>
            <StyledTableCell align="right">{row.most_recent_speed}</StyledTableCell>
            <StyledTableCell align="right">{row.speed_unit}</StyledTableCell>
            <StyledTableCell align="right">{row.avg_speed}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Container>
    </>
  );
};

export default Places;
