function Toolbar({ search, setSearch, sort, setSort, activeFilter, clearFilter }) {
  return (
    <div className="tool-row">
      <input
        placeholder="Search expenses…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="highest">Highest amount</option>
        <option value="lowest">Lowest amount</option>
      </select>
      {activeFilter && (
        <button onClick={clearFilter} className="clear-btn">
          Clear filter ✕
        </button>
      )}
    </div>
  );
}

export default Toolbar;