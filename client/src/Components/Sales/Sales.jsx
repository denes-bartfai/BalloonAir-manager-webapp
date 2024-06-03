import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import {NavigateBefore, NavigateNext, FirstPage, LastPage} from "@mui/icons-material";

import UpdateModal from "./UpdateModal";
import AddPerformanceForm from "./AddPerformanceForm";
import "./Sales.css";

const Sales = () => {

  const [performanceData, setPerformanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filter, setFilter] = useState("");
  const itemsPerPage = 4;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);

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

  const handleDelete = async (id) => {
    try{
      const res = await fetch("/api/Performance/DeletePerformance?performanceId=${id}", {
        method: "DELETE"
      });
      if(res.ok){
        fetchData();
      } else {
        console.error("Failed to delete peformance with ID: ${id}");
      }
    } catch(error){
      console.error(`Error deleting performance with ID: ${id}`, error);
    }
  }

  const handleUpdate = (performance) => {
    setSelectedPerformance(performance);
    setIsUpdateModalOpen(true);
  }

  const handleUpdateSubmit = async (updatedPerformance) => {
    try{
      const res = await fetch(`/api/Performance/PatchPerformance?id=${updatedPerformance.id}`, {
        method: "PATCH",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedPerformance),
      });
      if(res.ok){
        fetchData();
        setIsUpdateModalOpen(false);
        selectedPerformance(null);
      } else {
        console.error(`Failed to update performance with ID: ${updatedPerformance.id}`);
      }
    } catch (error) {
      console.error(`Error updating performance with ID: ${updatedPerformance.id}`, error);
    }
  }

  const handleAddPerformance = async (newPerformance) => {
    try{
      const res = await fetch("/api/Performance/AddPerformance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(newPerformance),
      });
      if(res.ok){
        fetchData();
      } else{
        console.error("Failed to add performance.");
      }
    } catch (error) {
      console.error("Error adding performance.", error);
    }
  };

  const handleSort = (column) =>{
    const newSortDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...performanceData].sort((a,b) => {
      if(a[column] < b[column]){
        return newSortDirection === "asc" ? -1 : 1;
      }
      if(a[column] > b[column]){
        return newSortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortColumn(column);
    setSortDirection(newSortDirection);
    setPerformanceData(sortedData);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
    setCurrentPage(1);
  }

  const filteredData = performanceData.filter(performance =>
    Object.values(performance).some(value => 
      value.toString().toLowerCase().includes(filter)
    )
  );

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex).map((performance, index) => (
      <TableRow key={index}>
        <TableCell>{performance.date.substring(0, 10)}</TableCell>
        <TableCell>{performance.state}</TableCell>
        <TableCell>{performance.city}</TableCell>
        <TableCell>{performance.event}</TableCell>
        <TableCell>{performance.sales.toLocaleString()}</TableCell>
        <TableCell>{performance.comment}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={() => handleUpdate(performance)}>Javítás</Button>
        </TableCell>
        <TableCell>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(performance.id)}>Törlés</Button>
        </TableCell>
        
    </TableRow>
    ))
  };

  return (
    <div className="sales-container">
      <h2>Értékesítés</h2>
      <div className="card">
        <div className="sales-add-container">
        <AddPerformanceForm onAdd={handleAddPerformance} />
        </div>
        <div className="sales-general-filter">
        <TextField
          label="Filter"
          variant="filled"
          size="small"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          style={{ marginBottom: "2rem"}}
        />
        </div>
        {performanceData.length > 0 ? (
          <div>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell onClick={() => handleSort("date")}>Dátum</TableCell>
                  <TableCell onClick={() => handleSort("state")}>Megye</TableCell>
                  <TableCell onClick={() => handleSort("city")}>Város</TableCell>
                  <TableCell onClick={() => handleSort("event")}>Esemény</TableCell>
                  <TableCell onClick={() => handleSort("sales")}>Eladás</TableCell>
                  <TableCell onClick={() => handleSort("comment")}>Komment</TableCell>
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
      {isUpdateModalOpen && (
        <UpdateModal
        performance={selectedPerformance}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default Sales