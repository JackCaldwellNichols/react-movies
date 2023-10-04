import React, {createContext, useState, useEffect} from "react";

export const MovieContext = createContext()

export const MovieContextProvider = ({children}) => {

    const [movies, setMovies] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TOKEN
          }
        };
        
        fetch(url, options)
          .then(res => res.json())
          .then(json => setMovies(json.results))
          .then((setIsLoading(false)))
          .catch(err => console.error('error:' + err));
      }, [])

       useEffect(() => {
        setIsLoading(true)
        const url = 'https://api.themoviedb.org/3/movie/upcoming';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TOKEN
          }
        };
     
        fetch(url, options)
        
          .then(res => res.json())
          .then(json => setUpcoming(json.results))
          .then(setIsLoading(false))
          .catch(err => console.error('error:' + err));
      }, [])

           useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/top_rated';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TOKEN
          }
        };
        
        fetch(url, options)
          .then(res => res.json())
          .then(json => setTopRated(json.results))
          .catch(err => console.error('error:' + err));
      }, [])


      return (
        <MovieContext.Provider value={{movies, isLoading, topRated, upcoming}}>{children}</MovieContext.Provider>
      )


}