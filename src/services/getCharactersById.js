import axios from "axios";

import md5 from 'md5';

const API_PUBLIC_KEY = "cf18ff834aee8bee1bf2423d03e87810";
const API_PRIVATE_KEY = "888e1c9b06e2dfff79bd0e0853e676f741aed973";
const API_BASE_URL = "https://gateway.marvel.com/v1/public/characters";

const getMarvelApiUrl = (id) => {
    const ts = new Date().getTime();
    const hash = md5(`${ts}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);
    return `${API_BASE_URL}/${id}?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
  };


const getCharactersById = async (id) => {
    
  const result = await axios(getMarvelApiUrl(id));
  
  return result.data.data.results;
};

export default getCharactersById;