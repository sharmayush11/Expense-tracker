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

  return (
    <div style={styles.page}>
      <div style={styles.sheet}>
        <header style={styles.header}>
          <h1>Expense Tracker</h1>
        </header>
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