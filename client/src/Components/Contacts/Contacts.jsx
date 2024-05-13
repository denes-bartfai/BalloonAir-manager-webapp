import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import "./Contacts.css";


const Contacts = () => {

  const [contactData, setContactData] = useState([]);

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

  

  return (
    <div className="contact-container">
      <h2>Kontaktlista</h2>
      <div className="card">
        {contactData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="table-head">
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
                {contactData.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>{contact.city}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.position}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
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
  );
}

export default Contacts