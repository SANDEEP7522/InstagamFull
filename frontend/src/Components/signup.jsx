import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from 'axios';




export default function Signup() {

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    console.log(input);
    
    try { // fetch my api frome backend
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });



      if (res.data.success) { // success login
        setSnackbarMessage(res.data.message);
        setSnackbarSeverity('success');
      } else { // ifr we fail then 
        setSnackbarMessage(res.data.message || 'Registration failed.');
        setSnackbarSeverity('error');
      }
    
    
    } catch (error) {
      console.log(error);
      // without given information try to submit
      const errorMessage =
        error.response?.data?.message || 
        error.message || 
        'An error occurred. Please try again.';

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center ">
      <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
        <div>
          <h2 className="text-center font-bold text-xl">LOGO</h2>
          <p className="text-center text-sm">
            Sign up to see phone & video from your friends
          </p>
        </div>
        <div>
          <div className="font-medium mt-8">
            <TextField
              type="text"
              name="username"
              value={input.username}
              onChange={changeEventHandler}
              id="outlined-basic"
              label="UserName"
              variant="outlined"
            />
          </div>
          <div className="font-medium mt-8">
            <TextField
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className="font-medium mt-8">
            <TextField
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
        </div>
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </form>

     <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
