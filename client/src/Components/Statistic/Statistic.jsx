import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


import "./Statistic.css";

const Statistic = () => {

  const [latestData, setLatestData] = useState([]);

  useEffect(() =>{
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const res = await fetch("/api/Performance/GetLatest");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setLatestData(data.res);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLatestData([])
    }
  };
  return (
    <div className="contact-container">
    <h2>Kontaktlista</h2>
    <div className="card">
      {latestData.length >= 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="table-head">
              <TableRow>
                <TableCell>Dátum</TableCell>
                <TableCell>Megye</TableCell>
                <TableCell>Város</TableCell>
                <TableCell>Esemény</TableCell>
                <TableCell>Eladás</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestData.map((latest, index) => (
                <TableRow key={index}>
                  <TableCell>{latest.date}</TableCell>
                  <TableCell>{latest.state}</TableCell>
                  <TableCell>{latest.city}</TableCell>
                  <TableCell>{latest.event}</TableCell>
                  <TableCell>{latest.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No contact available.</p>
      )}
    </div>
  </div>
  )
}

export default Statistic