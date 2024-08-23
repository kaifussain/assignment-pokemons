import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Fetches all Pokemon names and their image URLs from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of Pokemon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");

        if (!response.ok) {
          throw new Error(`HTTP error! [status: ${response.status}]`);
        }

        const result = await response.json();

        // Fetch image URLs for each Pokemon
        const pokemonsNameAndImage = await Promise.all(
          result.results.map(async (pokemon) => {
            const urlResponse = await fetch(pokemon.url);
            const urlData = await urlResponse.json();
            return {
              name: pokemon.name,
              imageUrl: urlData.sprites.front_default,
            };
          })
        );

        // Set the fetched Pokemon data
        setPokemons(pokemonsNameAndImage);
      } catch (error) {
        // Log and set error message if data fetching fails
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Filter Pokemon based on the search term
  useEffect(() => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.includes(searchTerm.toLowerCase())
    );
    setPokemonsFiltered(filtered);
  }, [searchTerm, pokemons]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <h1>Pokemons</h1>
      <label>Search </label>
      <input value={searchTerm} onChange={handleSearch}></input>
      {error ? (
        <>
          <h3>Unable to fetch the data!</h3>
          <p>Error: {error}</p>
        </>
      ) : (
        <>
          {pokemonsFiltered.map((pokemon) => (
            <Card
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
            />
          ))}
        </>
      )}
    </>
  );
}

export default App;
