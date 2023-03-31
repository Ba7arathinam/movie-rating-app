import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useState} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const moviValidationSchema =yup.object({
  name:yup.string().required(),
  poster:yup.string().min(4).required(),
  rating:yup.number().min(0).max(10).required(),
  summary:yup.string().min(20).required(),
  trailer:yup.string().min(4).required().url(),
});

export function EditMovie() {
  const[movie,setMovie] = useState(null);
  useEffect(()=>{
    fetch(`https://63899fec4eccb986e895aacd.mockapi.io/ratingapp/${id}`,{method: "GET",})
    .then((response) => response.json())
    .then((response) =>setMovie(response));
  });
  const{id}=useParams();

  return <div> {movie ? <EditMovieForm movie={movie} />:"loding......"} </div>
    
  }

  function EditMovieForm({movie}){
  const navigate=useNavigate();
  const {handleSubmit,values,handleChange,handleBlur,touched,errors} = useFormik({
    initialValues:{
      name:movie.name,
      poster:movie.poster,
      rating:movie.rating,
      summary:movie.summary,
      trailer:movie.trailer,
    },
    validationSchema:moviValidationSchema,
    onSubmit:(newMovie) => { console.log("form value:",newMovie);
                        addmovie(newMovie);
  },
  });

  const addmovie=(newMovie)=>{   
     fetch(`https://63899fec4eccb986e895aacd.mockapi.io/ratingapp/${movie.id}`,
  {method: "PUT", body:JSON.stringify(newMovie),
  headers: {"Content-Type": "application/json"},
}).then(()=>navigate("/Movies"));
         };

  return (
    <form  className="add-movie-form" onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Name" variant="outlined" value={values.name} 
    name="name" 
    onBlur={handleBlur} 
    onChange={handleChange}
    error={errors.name&&touched.name}
    helperText=  {errors.name&&touched.name ? errors.name :null}  />
  
      <TextField id="standard-basic" label="poster" variant="outlined" value={values.poster} 
    name="poster"
    onBlur={handleBlur} 
    onChange={handleChange}
    error={errors.poster&&touched.poster}
    helperText={errors.poster&&touched.poster ? errors.poster :null} />
    
      <TextField id="standard-basic" label="Rating" variant="outlined" value={values.rating} 
    name="rating"
    onBlur={handleBlur} 
    onChange={handleChange} 
    error={errors.rating&&touched.rating}
    helperText={errors.rating&&touched.rating ? errors.rating :null} />
    
      <TextField id="standard-basic" label="Summary" variant="outlined" value={values.summary} 
    name="summary"  
    onBlur={handleBlur} 
    onChange={handleChange}
    error={errors.summary&&touched.summary}
    helperText= {errors.summary&&touched.summary ? errors.summary :null}/>
    
      <TextField id="standard-basic" label="Trailer" variant="outlined" value={values.trailer} 
    name="trailer" 
    onBlur={handleBlur} 
    onChange={handleChange}
    error={errors.trailer&&touched.trailer}
    helperText={errors.trailer&&touched.trailer ? errors.trailer :null}  />
    
      <Button type="submit"variant="contained" color='warning'>save</Button>
    </form>
  );

  }
