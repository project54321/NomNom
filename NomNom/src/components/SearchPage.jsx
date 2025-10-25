import { useState } from "react";
import Navbar from "./Navbar";

export default function SearchPage({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <div className="landing-container">
      <Navbar/>
      <main className="landing-main fade-in-up">
        <section className="search-card glass">
          <h1>Find a Recipe</h1>
          <p className="muted">Search by dish name or ingredient</p>
          <form onSubmit={handleSubmit} className="search-form">
            <input
              className="search-input"
              placeholder="e.g. Chicken Alfredo, Pancakes"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <small className="muted">Try simple words like “chicken” or “pasta”</small>
        </section>
      </main>
    </div>
  );
}
