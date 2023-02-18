import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import backgroundImage from "../Images/bg.png";

function FavCard({ item }) {
  const [hover, setHover] = useState(false);
  const styleFav = {
    color: "#fff",
    borderBottom: "1px solid #fff",
    lineHeight: "1.4",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
  };

  const styleFavHover = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };

  return (
    <div
      style={hover ? { ...styleFav, ...styleFavHover } : styleFav}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        e.preventDefault();
        window.open(item.news.url, "_blank");
      }}
    >
      {item.news.title}
    </div>
  );
}

function Leftside(props) {
  const { favItem, handleClearFav } = props;

  const displayFav = favItem.map((item, index) => {
    return (
      <div key={index}>
        <FavCard item={item} />
      </div>
    );
  });

  const handleClick = (e) => {
    e.preventDefault();
    handleClearFav();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "638px",
        overflow: "auto",
      }}
    >
      <Grid container direction="column">
        <Grid item lg={2.5} sx={{ p: 1 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize="20px" style={{ color: "#fff" }}>
              My Favourites: {favItem.length}
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="small"
              style={{ textTransform: "none" }}
              onClick={handleClick}
            >
              Clear
            </Button>
          </Box>
        </Grid>
        <Grid item lg={9.5}>
          {displayFav}
        </Grid>
      </Grid>
    </div>
  );
}

export default Leftside;
