import { CATEGORIES, currency } from "./categories";

function CategoryChips({ byCategory, activeFilter, onToggle }) {
  return (
    <div className="chip-grid">
      {Object.entries(CATEGORIES).map(([cat, meta]) => {
        const active = activeFilter === cat;
        return (
          <button
            key={cat}
            className="chip"
            onClick={() => onToggle(active ? null : cat)}
            style={{
              borderColor: active ? meta.color : "#e4ddd0",
              background: active ? meta.color + "1a" : "#fff",
            }}
          >
            <span>{meta.emoji} {cat}</span>
            <span className="chip-amt" style={{ color: meta.color }}>
              {currency(byCategory[cat])}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;