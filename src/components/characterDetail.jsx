import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getCharactersById from '../services/getCharactersById';

function CharacterDetail() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();
  const navigateTo = useNavigate();


    useEffect(() => {
    const fetchData = async () => {
      const result = await getCharactersById(id);
      setCharacter(result);
      };
      fetchData();
    }, [id]);

  if (!character) {
    return <p>Loading character...</p>;
  }

  return (
    <div className='container-details'>
        <h2 className="character-name-detail">{character[0].name}</h2>
        <img 
                src={`${character[0].thumbnail.path}.${character[0].thumbnail.extension}`}
                alt={character[0].name} 
                className="character-image-detail"
        />
        <p className='character-description'>{character[0].description} </p>
        <button className='button' onClick={() => navigateTo(-1)}>Back to gallery</button>
      </div>
  );
}

export default CharacterDetail;