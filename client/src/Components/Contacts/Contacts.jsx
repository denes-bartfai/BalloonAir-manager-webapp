import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, IconButton } from "@mui/material";
import {NavigateBefore, NavigateNext, FirstPage, LastPage} from "@mui/icons-material";

import UpdateContacts from "./UpdateContacts";
import "./Contacts.css";


const Contacts = () => {

  const [contactData, setContactData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

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

  const formatPhoneNumber = (phoneNumber) => {
    if(phoneNumber.length === 11){//Mobile number
      return `${phoneNumber.slice(0,2)} (${phoneNumber.slice(2,4)}) ${phoneNumber.slice(4,7)} - ${phoneNumber.slice(7)}`;
    } else if (phoneNumber.length === 10){ //Landline numbers
      return `${phoneNumber.slice(0,2)} (${phoneNumber.slice(2,3)}) ${phoneNumber.slice(3,6)} - ${phoneNumber.slice(6)}`;
    } 
    return phoneNumber;
  }
  
  const handleDelete = async (id) => {
    try{
      const res = await fetch("/api/Contact/DeleteContact?contactId=${id}", {
        method: "DELETE"
      });
      if(res.ok){
        fetchData();
      } else {
        console.error("Failed to delete contact with ID: ${id}");
      }
    } catch(error){
      console.error(`Error deleting contact with ID: ${id}`, error);
    }
  }

  const handleUpdate = (contact) => {
    setSelectedContact(contact);
    setIsUpdateModalOpen(true);
  }

  const handleUpdateSubmit = async (updatedContact) => {
    try{
      const res = await fetch(`/api/Contact/PatchContact?id=${updatedContact.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedContact)
      });
      if(res.ok){
        fetchData();
        setIsUpdateModalOpen(false);
        selectedContact(null);
      } else {
        console.error(`Failed to update contact with ID:${updatedContact.id}`);
      }
    } catch (error) {
      console.error(`Error updating cintact with ID:${updatedContact.id}`, error);
    }
  }


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
      <TableCell>{formatPhoneNumber(contact.phoneNumber)}</TableCell>
      <TableCell>
      <Button variant="contained" color="primary" onClick={() => handleUpdate(contact)}>
        Javítás
      </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => handleDelete(contact.id)}>
          Törlés
        </Button>
      </TableCell>
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
                  <TableCell>Javítás</TableCell>
                  <TableCell>Törlés</TableCell>
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
      {isUpdateModalOpen && (
        <UpdateContacts
          contact={selectedContact}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
}

export default Contacts