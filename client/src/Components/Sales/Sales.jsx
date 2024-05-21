import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import {NavigateBefore, NavigateNext, FirstPage, LastPage} from "@mui/icons-material";

import "./Sales.css";

const Sales = () => {

  const [performanceData, setPerformanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() =>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/Performance/GetAllPerformance");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setPerformanceData(data.res); 
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.text) {
        const responseText = await error.response.text();
        console.error("Response text:", responseText);
      }
      setPerformanceData([]);
    }
  };

  const totalPage = Math.ceil(performanceData.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1)
  };

  const handleClickPrev = () => {
    setCurrentPage(currentPage - 1)
  };

  const handleGoToPage = (event) => {
    let pageNumber = parseInt(event.target.value);
    if(!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPage){
      setCurrentPage(pageNumber);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPage);
  }

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return performanceData.slice(startIndex, endIndex).map((performance, index) => (
      <TableRow key={index}>
        <TableCell>{performance.date.substring(0, 10)}</TableCell>
        <TableCell>{performance.state}</TableCell>
        <TableCell>{performance.city}</TableCell>
        <TableCell>{performance.event}</TableCell>
        <TableCell>{performance.sales.toLocaleString()}</TableCell>
        <TableCell>{performance.comment}</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
    </TableRow>
    ))
  };

  return (
    <div className="sales-container">
      <h2>Értékesítés</h2>
      <div className="card">
        {performanceData.length > 0 ? (
          <div>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>Dátum</TableCell>
                  <TableCell>Megye</TableCell>
                  <TableCell>Város</TableCell>
                  <TableCell>Esemény</TableCell>
                  <TableCell>Eladás</TableCell>
                  <TableCell>Komment</TableCell>
                  <TableCell>Javítás</TableCell>
                  <TableCell>Törlés</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderData()}
              </TableBody>
            </Table>
          </TableContainer>
            <div className="pagination-container">
              <IconButton onClick={handleFirstPage} disabled={currentPage === 1}>
                <FirstPage />
              </IconButton>
              <IconButton onClick={handleClickPrev} disabled={currentPage === 1}>
              <NavigateBefore />
              </IconButton>
              <span>{`${currentPage} / ${totalPage}`}</span>
              <IconButton onClick={handleClickNext} disabled={currentPage === totalPage}>
              <NavigateNext />
              </IconButton>
              <IconButton onClick={handleLastPage} disabled={currentPage === totalPage}>
              <LastPage />
              </IconButton>
              <TextField
              type="number"
              variant="outlined"
              size="small"
              label="Oldal"
              onChange={handleGoToPage}
              inputProps={{min: 1, max: totalPage}}
              />
            </div>
          </div>
        ) : (
          <p>No performance available.</p>
        )}
      </div>
    </div>
  );
}

export default Sales