import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState([]);

  const searchRecipes = async () => {
    try {
      const searchUrl = `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${topic}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json();
      console.log(searchData);
      setResults(searchData.meals || []);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter a recipe..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button onClick={searchRecipes}>Search</button>

      <ul>
        {results.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
