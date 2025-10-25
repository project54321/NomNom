export default function Navbar({ onBack }) {
  return (
    <nav className="nav glass">
      <div className="logo">
        Nom<span>Nom</span>
      </div>

      {onBack && (
        <div className="links">
          <button className="tab" onClick={onBack}>Explore</button>
          <button className="tab" onClick={onBack}>Search</button>
        </div>
      )}
    </nav>
  );
}
