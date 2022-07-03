import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonList from "./Components/PokemonList";
import Pagination from './Components/Pagination';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name));
    })
    return () => cancel()
  }, [currentPageUrl])
  
  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }
  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl)
  }
  return (
    <>
      <h1>Pokemon Api App</h1>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  )
}
export default App