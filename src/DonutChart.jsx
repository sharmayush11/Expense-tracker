function DonutChart({ byCategory, total, colors, count }) {
  let gradient = "conic-gradient(#e4ddd0 0deg 360deg)";
  if (total > 0) {
    let acc = 0;
    const stops = Object.entries(byCategory)
      .filter(([, v]) => v > 0)
      .map(([cat, val]) => {
        const start = (acc / total) * 360;
        acc += val;
        const end = (acc / total) * 360;
        return `${colors[cat]} ${start}deg ${end}deg`;
      });
    gradient = `conic-gradient(${stops.join(", ")})`;
  }

  return (
    <div className="donut" style={{ background: gradient }}>
      <div className="donut-hole">
        <span className="donut-hole-num">{count}</span>
        <span className="donut-hole-label">entries</span>
      </div>
    </div>
  );
}

export default DonutChart;