import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import {NavigateBefore, NavigateNext, FirstPage, LastPage} from "@mui/icons-material";

import "./Contacts.css";


const Contacts = () => {

  const [contactData, setContactData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() =>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/Contact/GetAllContact");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setContactData(data.res); // Extract "res" property
    } catch (error) {
      console.error("Error fetching data:", error);
      setContactData([]); // Set performanceData to an empty array on error
    }
  };

  const totalPage = Math.ceil(contactData.length / itemsPerPage);

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
  }

  const handleLastPage = () => {
    setCurrentPage(totalPage);
  };

const renderData = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return contactData.slice(startIndex, endIndex).map((contact, index) => (
    <TableRow key={index}>
      <TableCell>{contact.city}</TableCell>
      <TableCell>{contact.company}</TableCell>
      <TableCell>{contact.position}</TableCell>
      <TableCell>{contact.name}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.phoneNumber}</TableCell>
    </TableRow>
  ))
};
  

  return (
    <div className="contact-container">
      <h2>Kontaktlista</h2>
      <div className="contact-card">
        {contactData.length > 0 ? (
          <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="contact-table-head">
                <TableRow>
                  <TableCell>Város</TableCell>
                  <TableCell>Intémény</TableCell>
                  <TableCell>Pozíció</TableCell>
                  <TableCell>Név</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telefonszám</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderData()}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="contact-pagination-container">
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
          <p>No contact available.</p>
        )}
      </div>
    </div>
  );
}

export default Contacts