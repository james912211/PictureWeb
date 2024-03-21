import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentInput, setCurrentInput] = useState("");
  const auth = process.env.REACT_APP_PEXELSAUTH;
  const initialURL = `https://api.pexels.com/v1/curated?page=1&per_page=16`;
  let seachURL = `https://api.pexels.com/v1/search?query=${input}&per_page=16&page=1`;
  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth }, //送key給他
    });
    setData(result.data.photos);
    setCurrentInput(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);

    if (currentInput === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentInput}&per_page=16&page=${
        page + 1
      }`;
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: auth }, //送key給他
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(seachURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d, i) => {
            return <Picture key={i} data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
