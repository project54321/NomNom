import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import RecipePage from "./components/RecipePage";
import "./index.css";

export default function App() {
  const [topic, setTopic] = useState(null);

  return (
    <div className="app">
      {topic ? (
        <RecipePage topic={topic} onBack={() => setTopic(null)} />
      ) : (
        <SearchPage onSearch={setTopic} />
      )}
    </div>
  );
}
