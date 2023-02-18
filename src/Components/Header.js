import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Images/bg.png";

function Header(props) {
  const { handleSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const LOCAL_STORAGE_LOGIN_KEY = "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleLogOutClick = () => {
    setIsLoggedIn(false);
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(isLoggedIn));
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(isLoggedIn));
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <div>
      <Box
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, boxShadow: 3 }}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          find.My.News :&#41;
        </Typography>
        <Box
          component="form"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          onSubmit={handleSubmit}
        >
          <TextField
            hiddenLabel
            variant="filled"
            size="small"
            sx={{
              width: "600px",
              mr: 2,
              borderRadius: 1,
              bgcolor: "rgba(255,255,255,0.7)",
            }}
            placeholder="Search your keywords here"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></TextField>
          <Button
            variant="contained"
            color="warning"
            size="large"
            style={{ textTransform: "none" }}
            onClick={handleClick}
          >
            Search for News
          </Button>
        </Box>
        <Box>
          <Chip
            avatar={<Avatar>A</Avatar>}
            label="Admin"
            color="warning"
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            color="warning"
            size="medium"
            style={{ textTransform: "none" }}
            onClick={handleLogOutClick}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Header;
