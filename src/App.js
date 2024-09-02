import React from "react";
import EnhancedEsportsChart from "./EnhancedEsportsChart";
import data2 from "./data.json";
import "./styles.css";

export default function App() {
  return (
    <div className="app-container">
      <EnhancedEsportsChart data={data2} />
    </div>
  );
}