import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const UpdateModal = ({performance, onClose, onSubmit}) => {
    const [formData, setFormData] = useState(performance);

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
        <h2>Update Performance</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Dátum"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Megye"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Város"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Esemény"
            name="event"
            value={formData.event}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Eladás"
            name="sales"
            type="number"
            value={formData.sales}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Komment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Javítás</Button>
          <Button onClick={onClose} variant="contained" color="secondary">Kilépés</Button>
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

export default UpdateModal