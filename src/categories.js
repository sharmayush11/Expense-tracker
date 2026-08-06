export const CATEGORIES = {
  Food: { emoji: "🍔", color: "#B4432D" },
  Travel: { emoji: "🚗", color: "#A67C2E" },
  Shopping: { emoji: "🛍️", color: "#5B6E8C" },
  Bills: { emoji: "🧾", color: "#2F6F4E" },
  Fun: { emoji: "🎬", color: "#8A4F9E" },
  Other: { emoji: "📦", color: "#6B6155" },
};

export function currency(n) {
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}