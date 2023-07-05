import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { Container } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPlacesData } from '../redux/places/placesSlice';
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
  );
};

export default Places;
