import React, { useState, useEffect } from "react";
import { Card, Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function NewsItem(props) {
  const LOCAL_STORAGE_KEY = "favourite";
  const { news, handleFav } = props;
  const [isActive, setIsActive] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    handleFav({ ...props, isActive });
  };

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    response.forEach((item) => {
      if (item.news.title === news.title) {
        setIsActive(!isActive);
      }
    });
  }, []);

  return (
    <Card sx={{ height: 430 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {news.source.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={news.source.name}
        subheader={news.publishedAt}
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ height: "100%" }}
      >
        <div style={hover ? { display: "none" } : { display: "block" }}>
          <CardMedia
            component="img"
            height="194"
            image={news.urlToImage}
            alt="Image not available"
          />
          <CardContent sx={{ pb: 0 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ height: 80, overflow: "hidden" }}
            >
              {news.description}
            </Typography>
          </CardContent>
        </div>
        <div
          style={
            hover ? { display: "block", height: "314px" } : { display: "none" }
          }
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 80, p: 4 }}
          >
            {news.title}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{ ml: 7 }}
            onClick={(e) => {
              e.preventDefault();
              window.open(news.url, "_blank");
            }}
          >
            Direct to page
          </Button>
        </div>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            sx={{ mt: 0 }}
            style={isActive ? { color: "purple" } : { color: "black" }}
            onClick={handleClick}
          >
            <FavoriteIcon
              style={isActive ? { color: "purple" } : { color: "black" }}
            />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}
