import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const UpdateContacts = ({contact, onClose, onSubmit}) => {
    const [formData, setFormData] = useState(contact);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }
  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{ ...modalStyles, width: 400 }}>
        <h2>Update Contact</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Város"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Intézmény"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pozíció"
            name="position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Név"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telefonszám"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Update</Button>
          <Button onClick={onClose} variant="contained" color="secondary">Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
}

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

export default UpdateContacts