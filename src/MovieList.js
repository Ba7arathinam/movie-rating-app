import React from 'react';
import { Movie } from './App';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';



export function MovieList() {
  const[movieList,setMovieList] = useState([]);
  
const getMovies=()=>{ 
  fetch("https://63899fec4eccb986e895aacd.mockapi.io/ratingapp",{method: "GET",})
 .then((response) => response.json())
 .then((response) =>setMovieList(response));}  

  useEffect(()=>getMovies(), []);

  const DeleteMovie=(id)=>{
    fetch(`https://63899fec4eccb986e895aacd.mockapi.io/ratingapp/${id}`,{method: "DELETE",})
    .then((response) =>getMovies());
  };
  const navigate=useNavigate();
  return (
    <div>
    <div className="movie-list">
      {movieList.map((mov) => 
      (<div key={mov.id}>
      <Movie Movie={mov} id={mov.id}
      deleteButton={
      <IconButton sx={{marginLeft:"auto"}} color="error" onClick={()=>DeleteMovie(mov.id)} aria-label="delete">
      <DeleteIcon />
      </IconButton>}
      editButton={
        <IconButton sx={{marginLeft:"auto"}} color="secondary" onClick={()=>navigate(`/Movies/edit/${mov.id}`)} aria-label="delete">
        <EditIcon />
        </IconButton>}
      /> </div>)
       )}
    </div>
    </div>
  );
  }
  


