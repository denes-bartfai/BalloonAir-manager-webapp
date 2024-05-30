import React, { useState } from "react";
import {TextField, Button, Paper} from "@mui/material";


const AddContactForm = ({onAdd}) => {
    const [contact,setContact] = useState({
        city:"",
        company:"",
        position:"",
        name:"",
        email:"",
        phoneNumber:"",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setContact((prevContact) =>({
            ...prevContact,
            [name]:value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(contact);
        setContact({
            city:"",
            company:"",
            position:"",
            name:"",
            email:"",
            phoneNumber:"", 
        });
    };


  return (
    <Paper style={{padding: "1em", marginBottom:"1em"}}>
    <form onSubmit={handleSubmit}>
        <TextField
            label="Város"
            name="city"
            value={contact.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Intézmény"
            name="company"
            value={contact.company}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Pozíció"
            name="position"
            value={contact.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Név"
            name="name"
            value={contact.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Email"
            name="email"
            type="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Telefonszám"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
        />
        <Button type="submit" variants="contained" color="primary">
            Hozzáadás
        </Button>
    </form>
</Paper>


  )
}

export default AddContactForm
