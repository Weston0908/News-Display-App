import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  LinearProgress,
} from "@mui/material";
import backgroundImage from "../Images/bg.png";
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_LOGIN_KEY = "login";

const styles = {
  root: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setErrorMessage(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      setErrorMessage(true);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY));
    if (response) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(isLoggedIn));
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Paper style={styles.root}>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h2" sx={{ color: "#fff" }}>
          find.My.News :&#41;
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ bgcolor: "rgba(255,255,255,0.7)", m: 4, p: 6, borderRadius: 1 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            variant="outlined"
            sx={{ width: "300px" }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            sx={{ width: "300px", mb: 3 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ px: 5 }}
          >
            Login
          </Button>
          <LinearProgress />
        </Box>
      </Box>
      <Snackbar
        open={errorMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Invalid username or password!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default Login;
