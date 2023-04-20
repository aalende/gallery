import React, { useState, useEffect } from "react";
import getCharacters from "../services/getCharacters";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CharacterSearchList = () => {
  const [characters, setCharacters] = useState([]);
  const [characterSearched, setCharacterSearched] = useState(""); 
  const [limit, setLimit] = useState(21);
  const location = useLocation();
  const navigateTo = useNavigate();
  
  
  const params = new URLSearchParams(location.search);
  const offsetParams = params.get("offset");
  const [offset, setOffset] = useState(Number(offsetParams) ?? 0);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const offsetParams = params.get("offset");
    setOffset(Number(offsetParams) ?? 0);
  }, [location.search]);

  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getCharacters(offset, limit);
      console.log('dentro de la llamada a la api',offset);

      setCharacters(result);
    };
    fetchData();
  }, [offset, limit]);

  
 const handlePrevius = () =>{
  const newOffset = offset - limit;
  if (newOffset >= 0) {
    setOffset(newOffset);
    navigateTo(`?offset=${newOffset}`);
  }
 }

 const handleNext = () =>{
  const newOffset = offset + limit;
  setOffset(newOffset);
  navigateTo(`?offset=${newOffset}`);
 }

  const handleChange = (event) => {
      setCharacterSearched(event.target.value); 
  };
  
  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(characterSearched.toLowerCase())
  );
  

  return (
    <div>
      <div className="search-container">
        <input className="search-input" 
               placeholder= "Search character..." 
               type="text" 
               value={characterSearched} 
               onChange={handleChange} /> 
      </div>
      <div className="button-container">
        <button className="button" onClick={handlePrevius}>Previous</button>
        <button className="button" onClick={handleNext}>Next</button>
      </div>
      <div className="characters-container">
        {filteredCharacters.map((character) => (
        <Link to={`/characters/${character.id}`} key={character.id} >
          <div  className="character-item" >
            <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name} 
                className="character-image"
            />
            <h2 className="character-name">{character.name}</h2>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterSearchList;