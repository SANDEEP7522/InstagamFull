import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../Redux/authSlice";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    console.log(input);

    try {
      // fetch my api frome backend
      setLoding(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        setSnackbarMessage(res.data.message);
        setSnackbarSeverity("success");
        setInput({
          email: "",
          password: "",
        });
      } else {
        // ifr we fail then
        setSnackbarMessage(res.data.message || "Registration failed.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.log(error);
      // without given information try to submit
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";

      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setLoding(false);
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center  bg-gradient-to-r from-purple-500 to-pink-500 ">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-5 p-8  bg-brown-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100
"
      >
        <div>
          <h2 className="text-center font-bold text-xl ">LOGO</h2>
          <p className="text-center text-sm">
            Login up to see phone & video from your friends
          </p>
        </div>
        <div>
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
        {loding ? (
          <Button type="submit" variant="contained">
            plese Wait.........
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        )}

        <span>
          No Accout, first Singup?{" "}
          <Link to="/signup" className="text-blue-700  ">
            Signup
          </Link>{" "}
        </span>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
