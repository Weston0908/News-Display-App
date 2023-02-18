import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Grid } from "@mui/material";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const urlParam = {
  query: "Apple",
  from: "2023-02-08",
  sortBy: "popularity",
  apiKey: `${API_KEY}`,
};

const url = new URL("https://newsapi.org/v2/everything?");
url.searchParams.set("q", urlParam.query);
url.searchParams.set("from", urlParam.from);
url.searchParams.set("sortBy", urlParam.sortBy);
url.searchParams.set("apiKey", urlParam.apiKey);

const LOCAL_STORAGE_KEY = "favourite";

function Home() {
  const [news, setNews] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);
  const [favItem, setFavItem] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  const [pages, setPages] = useState(10);

  const handleSearch = (searchTerm) => {
    setSearchItem(searchTerm);
    if (searchTerm !== "") {
      const searchResult = news.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResponse(searchResult);
    } else {
      setSearchResponse(news);
    }
  };

  const handleFav = (favItemFromChild) => {
    if (!favItemFromChild.isActive) {
      setFavItem([...favItem, favItemFromChild]);
    }
    if (favItemFromChild.isActive) {
      const filteredItem = favItem.filter((item) => {
        return item.news.title !== favItemFromChild.news.title;
      });
      setFavItem(filteredItem);
    }
  };

  const loadMore = () => {
    setPages((prevNo) => {
      return prevNo + 10;
    });
  };

  const handleClearFav = () => {
    setFavItem([]);
  };

  const retrieveNews = async () => {
    const response = await axios.get(url);
    setNews(response.data.articles);
  };

  useEffect(() => {
    url.searchParams.set("pageSize", `${pages}`);
    retrieveNews();
  }, [pages]);

  useEffect(() => {
    handleSearch(searchItem);
  }, [news]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favItem));
  }, [favItem]);

  return (
    <div>
      <Grid container direction="column">
        <Grid item lg={1}>
          <Header handleSearch={handleSearch} />
        </Grid>
        <Grid item lg={11}>
          <Grid container direction="row">
            <Grid item lg={2.5}>
              <Leftside favItem={favItem} handleClearFav={handleClearFav} />
            </Grid>
            <Grid item lg={9.5}>
              <Rightside
                news={searchResponse}
                searchItem={searchItem}
                handleFav={handleFav}
                loadMore={loadMore}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
