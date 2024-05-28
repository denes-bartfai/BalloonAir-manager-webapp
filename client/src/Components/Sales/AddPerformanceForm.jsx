import React, { useState } from "react";
import {TextField, Button, Paper} from "@mui/material";

const AddPerformanceForm = ({onAdd}) => {
const [performance,setPerformance] = useState({
    date:"",
    state:"",
    city:"",
    event:"",
    sales:"",
    comment:"",
});

const handleChange = (e) => {
    const {name, value} = e.target;
    setPerformance((prevPerformance) => ({
        ...prevPerformance,
        [name]: value,
    }));
};

const handleSubmit = (e) =>{
    e.preventDefault();
    onAdd(performance);
    setPerformance({
        date:"",
        state:"",
        city:"",
        event:"",
        sales:"",
        comment:"",
    });  
};

  return (
    <Paper style={{padding: "1em", marginBottom:"1em"}}>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Dátum"
                type="date"
                name="date"
                value={performance.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Megye"
                name="state"
                value={performance.state}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Város"
                name="city"
                value={performance.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Esemény"
                name="event"
                value={performance.event}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Eladás"
                name="sales"
                value={performance.sales}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Komment"
                name="comment"
                value={performance.comment}
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

export default AddPerformanceForm