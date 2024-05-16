import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


import "./Statistic.css";

const Statistic = () => {

  const [latestData, setLatestData] = useState([]);
  const [topSales, setTopSales] = useState([]);

  useEffect(() =>{
    fetchLatestData();
    fetchTopSalesData();
  }, []);


  const fetchLatestData = async () => {
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

  const fetchTopSalesData = async () => {
    try {
      const res = await fetch("/api/Performance/GetTopSales");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setTopSales(data.res);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTopSales([])
    }
  };


  return (
    <div className="statistic-display">
    <div className="getLatest-container">
    <h2>Legutóbbi</h2>
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
                  <TableCell>{latest.date.substring(0,10)}</TableCell>
                  <TableCell>{latest.state}</TableCell>
                  <TableCell>{latest.city}</TableCell>
                  <TableCell>{latest.event}</TableCell>
                  <TableCell>{latest.sales.toLocaleString()}</TableCell>
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
  <div className="getTopSales-container">
    <h2>Legjobb eladás</h2>
    <div className="card">
      {topSales.length >= 0 ? (
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
              {topSales.map((top, index) => (
                <TableRow key={index}>
                  <TableCell>{top.date.substring(0,10)}</TableCell>
                  <TableCell>{top.state}</TableCell>
                  <TableCell>{top.city}</TableCell>
                  <TableCell>{top.event}</TableCell>
                  <TableCell>{top.sales.toLocaleString()}</TableCell>
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
  </div>
  )
}

export default Statistic