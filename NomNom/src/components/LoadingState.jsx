export default function LoadingState({ topic }) {
  return (
    <div className="landing-container center">
      <div className="search-card">
        <h1>
          Cooking up recipes for <span>"{topic}"</span> 🍳
        </h1>
        <p>Hang tight — fetching delicious details...</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
}
