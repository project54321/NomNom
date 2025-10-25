export default function EmptyState({ topic, onBack }) {
  return (
    <div className="landing-container center">
      <div className="search-card">
        <h1>No Results Found 😔</h1>
        <p>
          We couldn’t find any recipes for <span>"{topic}"</span>.<br />
          Try searching for something else!
        </p>
        <button className="tab" onClick={onBack}>← Back to Search</button>
      </div>
    </div>
  );
}
