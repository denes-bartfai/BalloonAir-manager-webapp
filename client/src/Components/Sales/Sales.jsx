import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


import "./Sales.css";

const Sales = () => {

  const [performanceData, setPerformanceData] = useState([]);

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
      setPerformanceData(data.res); // Update state with the response data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Check if there's response text and log it
      if (error.response && error.response.text) {
        const responseText = await error.response.text();
        console.error("Response text:", responseText);
      }
      // Set performanceData to an empty array on error
      setPerformanceData([]);
    }
  };

  

  return (
    <div className="sales-container">
      <h2>Értékesítés</h2>
      <div className="card">
        {performanceData.length > 0 ? (
          <TableContainer component={Paper}>
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
                {performanceData.map((performance, index) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No performance available.</p>
        )}
      </div>
    </div>
  );
}

export default Sales