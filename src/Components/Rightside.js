import React from "react";
import NewsItem from "./NewsItem";
import backgroundImage from "../Images/bg.png";
import { Grid, Typography, Button, Box } from "@mui/material";

function Rightside(props) {
  const { news, searchItem, handleFav, loadMore } = props;
  const handleClick = (e) => {
    e.preventDefault();
    loadMore();
  };
  const displayNews = news.map((item, index) => {
    return (
      <Grid item lg={3} key={index}>
        <NewsItem news={item} index={index} handleFav={handleFav} />
      </Grid>
    );
  });

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "638px",
        overflowY: "auto",
      }}
    >
      <Typography variant="h4" sx={{ color: "#fff", mt: 2, ml: 2 }}>
        Searched results for {searchItem} :
      </Typography>
      {news.length < 1 ? (
        <Typography variant="h3" sx={{ color: "#fff", m: 2 }}>
          No news available
        </Typography>
      ) : (
        <Box display="flex" alignItems="center" flexDirection="column">
          <Grid container spacing={2} sx={{ p: 2, mt: 0 }}>
            {displayNews}
          </Grid>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClick}
            sx={{ width: 300, m: 2 }}
          >
            Load More
          </Button>
        </Box>
      )}
    </div>
  );
}

export default Rightside;
