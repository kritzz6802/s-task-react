import React, { useEffect, useState } from "react";
import './App.css';
import arrow from './assets/icons-arrow.png'

const CharacterSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=1&limit=15&q=${searchInput}&order_by=favorites&sort=desc`
      );
      const { data } = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error("Error at fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchInput.trim() === '') {
      fetchData();
    }
  }, [searchInput]);

  const handleSearch = () => {
    if(searchInput!==''){
    fetchData();
    }
  };

  return (
    <div>
      <div className="upper-part">
        <h1>Character Search</h1>
        <div>
          <input
            className="search-input"
            type="text"
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            placeholder="Search characters"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <p className="total-matching">
          Total {characters.length} Matching Character Name{" "}
        </p>
      </div>
      <div className="main-container">
        {characters.length !== 0 ? (
          <div className="container">
            {characters.map(({ mal_id, images, name, nicknames, favorites, url }) => (
              <div className="character-container" key={mal_id}>
                <img
                  className="character-image"
                  src={images?.jpg?.image_url}
                  alt=""
                />
                <div className="character-details">
                  <div>
                    <p>{name}</p>
                    <div className="nickname-chips">
                      {nicknames.map((nickname, index) => (
                        <span key={index} className="nickname-chip">
                          {nickname}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="right-part">
                    <div className="favorite-part">
                      <span className="favorite-icon">❤️</span> {favorites}
                    </div>
                    <div className="url-section">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-icon"
                      >
                        <img
                          src={arrow}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No Result Found</p>
        )}
      </div>
    </div>
  );
};

export default CharacterSearch;
