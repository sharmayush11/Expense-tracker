import React, { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { LedgerProvider, useLedger } from "./context/LedgerContext";
import EntrySlip from "./components/EntrySlip";
import BalanceStamp from "./components/BalanceStamp";
import LedgerTable from "./components/LedgerTable";
import ChartsPanel from "./components/ChartsPanel";
import styles from "./styles";

function TrackerBody() {
  const { entries } = useLedger();
  const [filter, setFilter] = useState("all");

  const totals = useMemo(() => {
    const income = entries.filter((e) => e.type === "credit").reduce((s, e) => s + e.amount, 0);
    const expense = entries.filter((e) => e.type === "debit").reduce((s, e) => s + e.amount, 0);
    return { income, expense, balance: income - expense };
  }, [entries]);

  return (
    <div style={styles.page}>
      <div style={styles.sheet}>
        <div style={styles.perforation}>
          {Array.from({ length: 26 }).map((_, i) => (
            <span key={i} style={styles.hole} />
          ))}
        </div>

        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>Personal Account Ledger</div>
            <h1 style={styles.title}>Expense Tracker</h1>
          </div>
          <div style={styles.headerMeta}>
            <span style={styles.metaLine}>Entries: {entries.length}</span>
            <span style={styles.metaLine}>
              {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
        </header>

        <BalanceStamp balance={totals.balance} income={totals.income} expense={totals.expense} />

        <EntrySlip />

        <ChartsPanel entries={entries} />

        <div style={styles.tableSectionHeader}>
          <span style={styles.tableSectionTitle}>Ledger Entries</span>
          <div style={styles.filterRow}>
            <Filter size={13} color="#5A5346" />
            {["all", "credit", "debit"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}
              >
                {f === "all" ? "All" : f === "credit" ? "Credit" : "Debit"}
              </button>
            ))}
          </div>
        </div>

        <LedgerTable entries={entries} filter={filter} />

        <footer style={styles.footer}>Sab entries tumhare browser mein hi save hoti hai — localStorage ke through.</footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LedgerProvider>
      <TrackerBody />
    </LedgerProvider>
  );
}