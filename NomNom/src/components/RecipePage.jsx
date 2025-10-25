import { useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import Navbar from "./Navbar";

export default function RecipePage({ topic, onBack }) {
  const [meal, setMeal] = useState(undefined);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchMeal() {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/${API_KEY}/search.php?s=${encodeURIComponent(topic)}`
        );
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch {
        setMeal(null);
      }
    }
    fetchMeal();
  }, [topic]);

  if (meal === undefined) return <LoadingState topic={topic} />;
  if (meal === null) return <EmptyState topic={topic} onBack={onBack} />;

  const getIngredients = () => {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing) list.push(`${meas ? meas : ""} ${ing}`);
    }
    return list;
  };

  return (
    <div className="recipe-page">
      <Navbar onBack={onBack} />

      <main className="container fade-in-up">
        <section className="hero-card glass">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div className="hero-info glass-mini">
            <h2>{meal.strMeal}</h2>
            <p>{meal.strCategory} • {meal.strArea}</p>
          </div>
        </section>

        <section className="details glass fade-in-up">
          <h1>{meal.strMeal}</h1>
          <p className="meta">{meal.strCategory} • {meal.strArea}</p>

          <div className="tabs">
            {["overview", "ingredients", "instructions", "video"].map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className={`tab-content ${activeTab === "overview" ? "active-tab" : ""}`}>
            <p>{meal.strInstructions.substring(0, 250)}...</p>
          </div>

          <div className={`tab-content ${activeTab === "ingredients" ? "active-tab" : ""}`}>
            <ul className="ingredients-list">
              {getIngredients().map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className={`tab-content ${activeTab === "instructions" ? "active-tab" : ""}`}>
            <p>{meal.strInstructions}</p>
          </div>

          <div className={`tab-content ${activeTab === "video" ? "active-tab" : ""}`}>
            {meal.strYoutube ? (
              <iframe
                src={meal.strYoutube.replace("watch?v=", "embed/")}
                title={meal.strMeal}
                allowFullScreen
              />
            ) : (
              <p>No video available.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
